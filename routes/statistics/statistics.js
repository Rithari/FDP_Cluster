const express = require("express");
const axios = require("axios");
const router = express.Router();

// Flask server URL
const flaskServerUrl = "http://localhost:5000/stats";

// Define the route to handle statistics requests and forward them to Flask
router.post("/stats", async (req, res) => {
  try {
    const { stats_category, identifier } = req.body;

    // Forward the request to Flask server
    const flaskResponse = await axios.post(flaskServerUrl, {
      stats_category,
      identifier,
    });

    // Return the response from Flask server
    res.json(flaskResponse.data);
  } catch (error) {
    console.error("Error forwarding request to Flask server:", error);
    if (error.response) {
      // Forward the error response from Flask
      res.status(error.response.status).json(error.response.data);
    } else {
      // Generic server error
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

module.exports = router;
