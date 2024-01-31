const express = require("express");
const NodeCache = require("node-cache");
const gamesCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });
const { Game, GameEvent, GameLineup } = require("../../mongo_models/games");

const router = express.Router();

router.get("/games", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.searchQuery || "";
  const sort = req.query.sort || "";

  // Ensure that 'page' is not negative and defaults to 0 if undefined
  const safePage = Math.max(0, page);

  const skipIndex = safePage * limit;
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

router.get("/games/club/:clubId", async (req, res) => {
  const clubId = req.params.clubId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.search || "";
  const sort = req.query.sort || "";

  const skipIndex = (page - 1) * limit;
  try {
    let query = {
      $or: [{ home_club_id: clubId }, { away_club_id: clubId }],
    };
    if (searchQuery) {
      query = {
        $and: [
          {
            $or: [
              { home_club_name: new RegExp(searchQuery, "i") },
              { away_club_name: new RegExp(searchQuery, "i") },
            ],
          },
          {
            $or: [{ home_club_id: clubId }, { away_club_id: clubId }],
          },
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
    const game = await Game.findOne({ game_id: gameId });

    if (!game) {
      return res.status(404).send("Game not found with ID: " + gameId);
    }

    // Since game_events and game_lineups are related by game_id, we need to fetch them separately
    const gameEvents = await GameEvent.find({ game_id: gameId });
    const gameLineups = await GameLineup.find({ game_id: gameId });

    // Now, combine the data into one object to return as the response
    const combinedGameData = {
      ...game.toObject(), // Convert the mongoose document to a plain JavaScript object
      game_events: gameEvents,
      game_lineups: gameLineups,
    };

    gamesCache.set(cacheKey, combinedGameData);
    res.json(combinedGameData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
