const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const playerCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const router = express.Router();
const springBootURL =
  process.env.EXPRESS_APP_SPRING_BOOT_URL || "http://localhost:8080";

router.get("/players", async (req, res) => {
  const cacheKey = "allPlayers";
  const cachedData = playerCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`${springBootURL}/players`);
    playerCache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/players/:playerId", async (req, res) => {
  const playerId = req.params.playerId;
  const cacheKey = `player_${playerId}`;
  const cachedData = playerCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`${springBootURL}/players/${playerId}`);
    playerCache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
