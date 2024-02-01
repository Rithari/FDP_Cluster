const express = require("express");
const axios = require("axios");
const router = express.Router();

// URL of the Flask server
const flaskURL = process.env.EXPRESS_APP_FLASK_URL || "http://localhost:4000";

/**
 * Route to handle POST requests to '/stats'.
 * Forwards the request to the Flask server and returns the response.
 */
router.post("/stats", async (req, res) => {
  try {
    // Extract stats_category and identifier from request body
    const { stats_category, identifier } = req.body;

    console.log("Sending request to Flask with body:", req.body);

    // Forward the request to the Flask server
    const flaskResponse = await axios.post(
      `${flaskURL}/stats`,
      {
        stats_category,
        identifier,
      },
      {
        responseType: "arraybuffer", // Expecting a binary response (e.g., file stream)
        headers: {
          Accept: "application/octet-stream",
        },
      }
    );

    console.log("Received response from Flask");

    // Set content type and disposition headers based on Flask server's response
    res.set({
      "Content-Type": flaskResponse.headers["content-type"],
      "Content-Disposition": flaskResponse.headers["content-disposition"],
    });

    // Send the file stream or data from Flask as the response
    res.send(flaskResponse.data);
  } catch (error) {
    console.error("Error forwarding request to Flask server:", error);
    if (error.response) {
      // Forward the error response from the Flask server
      res.status(error.response.status).send(error.response.data);
    } else {
      // Generic server error
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
});

module.exports = router;
