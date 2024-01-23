const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const clubsCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const router = express.Router();

router.get("/clubs", async (req, res) => {
  const cacheKey = "allClubs";
  const cachedData = clubsCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get("http://localhost:8080/clubs");
    clubsCache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/clubs/:clubId", async (req, res) => {
  const clubId = req.params.clubId;
  const cacheKey = `club_${clubId}`;
  const cachedData = clubsCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`http://localhost:8080/clubs/${clubId}`);
    clubsCache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/clubs/competition/:competitionId", async (req, res) => {
  const competitionId = req.params.competitionId;
  const cacheKey = `clubsByCompetition_${competitionId}`;
  const cachedData = clubsCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/clubs/competition/${competitionId}`
    );
    clubsCache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
