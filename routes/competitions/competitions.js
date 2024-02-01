const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");

// Create a new cache instance for competition data
const competitionsCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const router = express.Router();
const springBootURL =
  process.env.EXPRESS_APP_SPRING_BOOT_URL || "http://localhost:8080";

/**
 * Route to get all competitions.
 * Caches the response for efficient retrieval.
 */
router.get("/competitions", async (req, res) => {
  const cacheKey = "allCompetitions";
  const cachedData = competitionsCache.get(cacheKey);

  // Return cached data if available
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // Fetch data from Spring Boot service if not cached
    const response = await axios.get(`${springBootURL}/competitions`);
    competitionsCache.set(cacheKey, response.data); // Cache the fetched data
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/**
 * Route to get details of a specific competition by its ID.
 * Caches the response for efficient retrieval.
 */
router.get("/competitions/:competitionId", async (req, res) => {
  const competitionId = req.params.competitionId;
  const cacheKey = `competition_${competitionId}`;
  const cachedData = competitionsCache.get(cacheKey);

  // Return cached data if available
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // Fetch data from Spring Boot service if not cached
    const response = await axios.get(
      `${springBootURL}/competitions/${competitionId}`
    );
    competitionsCache.set(cacheKey, response.data); // Cache the fetched data
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/**
 * Route to get statistics for a specific competition.
 * Caches the response for efficient retrieval.
 */
router.get("/competitions/:competitionId/statistics", async (req, res) => {
  const competitionId = req.params.competitionId;
  const cacheKey = `competitionStatistics_${competitionId}`;
  const cachedData = competitionsCache.get(cacheKey);

  // Return cached data if available
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // Fetch data from Spring Boot service if not cached
    const response = await axios.get(
      `${springBootURL}/competitions/${competitionId}/statistics`
    );
    competitionsCache.set(cacheKey, response.data); // Cache the fetched data
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
