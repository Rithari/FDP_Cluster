const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");

// Create a new cache instance for club data
const clubsCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const router = express.Router();
const springBootURL =
  process.env.EXPRESS_APP_SPRING_BOOT_URL || "http://localhost:8080";

/**
 * Route to get all clubs.
 * Caches the response for efficient retrieval.
 */
router.get("/clubs", async (req, res) => {
  const cacheKey = "allClubs";
  const cachedData = clubsCache.get(cacheKey);

  // Return cached data if available
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // Fetch data from Spring Boot service if not cached
    const response = await axios.get(`${springBootURL}/clubs`);
    clubsCache.set(cacheKey, response.data); // Cache the fetched data
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/**
 * Route to get details of a specific club by its ID.
 * Caches the response for efficient retrieval.
 */
router.get("/clubs/:clubId", async (req, res) => {
  const clubId = req.params.clubId;
  const cacheKey = `club_${clubId}`;
  const cachedData = clubsCache.get(cacheKey);

  // Return cached data if available
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // Fetch data from Spring Boot service if not cached
    const response = await axios.get(`${springBootURL}/clubs/${clubId}`);
    clubsCache.set(cacheKey, response.data); // Cache the fetched data
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/**
 * Route to get clubs associated with a specific competition.
 * Caches the response for efficient retrieval.
 */
router.get("/clubs/competition/:competitionId", async (req, res) => {
  const competitionId = req.params.competitionId;
  const cacheKey = `clubsByCompetition_${competitionId}`;
  const cachedData = clubsCache.get(cacheKey);

  // Return cached data if available
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // Fetch data from Spring Boot service if not cached
    const response = await axios.get(
      `${springBootURL}/clubs/competition/${competitionId}`
    );
    clubsCache.set(cacheKey, response.data); // Cache the fetched data
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/**
 * Route to get players of a specific club by the club's ID.
 * Caches the response for efficient retrieval.
 */
router.get("/clubs/:clubId/players", async (req, res) => {
  const clubId = req.params.clubId;
  const cacheKey = `clubPlayers_${clubId}`;
  const cachedData = clubsCache.get(cacheKey);

  // Return cached data if available
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    // Fetch data from Spring Boot service if not cached
    const response = await axios.get(
      `${springBootURL}/clubs/${clubId}/players`
    );
    clubsCache.set(cacheKey, response.data); // Cache the fetched data
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
