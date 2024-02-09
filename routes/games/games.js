const express = require("express");
const router = express.Router();
const gameController = require("../../mongo_controllers/gameController");

// Route to get a list of all games with optional search, sort, and pagination.
router.get("/games", gameController.getGames);

// Route to get a list of games for a specific club with optional search, sort, and pagination.
router.get("/games/club/:clubId", gameController.getGamesByClub);

// Route to get detailed information about a specific game, including game events and lineups. Results are cached.
router.get("/games/:gameId", gameController.getGameDetails);

module.exports = router;
