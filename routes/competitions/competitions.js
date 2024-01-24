const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const competitionsCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const router = express.Router();

router.get("/competitions", async (req, res) => {
  const cacheKey = "allCompetitions";
  const cachedData = competitionsCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get("http://localhost:8080/competitions");
    competitionsCache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/competitions/:competitionId", async (req, res) => {
  const competitionId = req.params.competitionId;
  const cacheKey = `competition_${competitionId}`;
  const cachedData = competitionsCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/competitions/${competitionId}`
    );
    competitionsCache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/competitions/:competitionId/statistics", async (req, res) => {
  const competitionId = req.params.competitionId;
  const cacheKey = `competitionStatistics_${competitionId}`;
  const cachedData = competitionsCache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/competitions/${competitionId}/statistics`
    );
    competitionsCache.set(cacheKey, response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
