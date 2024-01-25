const express = require("express");
const NodeCache = require("node-cache");
const gamesCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });
const Game = require("../../mongo_models/games");

const router = express.Router();

router.get("/games", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.search || "";
  const sort = req.query.sort || "";

  const skipIndex = (page - 1) * limit;
  try {
    let query = {};
    if (searchQuery) {
      query = {
        $or: [
          { home_club_name: new RegExp(searchQuery, "i") },
          { away_club_name: new RegExp(searchQuery, "i") },
        ],
      };
    }

    // handle sorting
    let sortOptions = {};
    if (sort) {
      const sortField = sort.split(":")[0];
      const sortOrder = sort.split(":")[1] === "asc" ? 1 : -1;
      sortOptions[sortField] = sortOrder;
    }

    const games = await Game.find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip(skipIndex);
    const total = await Game.countDocuments(query);

    res.json({ data: games, total: total });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/games/:gameId", async (req, res) => {
  const gameId = req.params.gameId;
  const cacheKey = `game_${gameId}`;
  const cachedData = gamesCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }
  try {
    const game = await Game.findOne({ _id: req.params.gameId });
    gamesCache.set(cacheKey, game);
    res.json(game);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
