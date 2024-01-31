const express = require("express");
const axios = require("axios");
const router = express.Router();

// Flask server URL
const flaskURL = process.env.EXPRESS_APP_FLASK_URL || "http://localhost:4000";

router.post("/stats", async (req, res) => {
  try {
    const { stats_category, identifier } = req.body;

    console.log("Sending request to Flask with body:", req.body);

    // Forward the request to Flask server
    const flaskResponse = await axios.post(
      `${flaskURL}/stats`,
      {
        stats_category,
        identifier,
      },
      {
        responseType: "arraybuffer", // Expecting a binary response (file stream)
        headers: {
          Accept: "application/octet-stream",
        },
      }
    );

    console.log("Received response from Flask");

    // Set content type and disposition based on Flask response
    res.set({
      "Content-Type": flaskResponse.headers["content-type"],
      "Content-Disposition": flaskResponse.headers["content-disposition"],
    });

    // Send the file stream
    res.send(flaskResponse.data);
  } catch (error) {
    console.error("Error forwarding request to Flask server:", error);
    if (error.response) {
      // Forward the error response from Flask
      res.status(error.response.status).send(error.response.data);
    } else {
      // Generic server error
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
});

module.exports = router;
