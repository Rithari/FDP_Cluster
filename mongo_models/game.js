const mongoose = require("mongoose");

/**
 * Represents a game.
 * @typedef {Object} Game
 * @property {string} _id - The ID of the game.
 * @property {number} aggregate - The aggregate score of the game.
 * @property {number} attendance - The attendance of the game.
 * @property {number} away_club_goals - The number of goals scored by the away club.
 * @property {number} away_club_id - The ID of the away club.
 * @property {string} away_club_manager_name - The name of the away club's manager.
 * @property {string} away_club_name - The name of the away club.
 * @property {string} away_club_position - The position of the away club.
 * @property {string} competition_id - The ID of the competition.
 * @property {string} competition_type - The type of the competition.
 * @property {Date} date - The date of the game.
 * @property {number} game_id - The ID of the game.
 * @property {number} home_club_goals - The number of goals scored by the home club.
 * @property {number} home_club_id - The ID of the home club.
 * @property {string} home_club_manager_name - The name of the home club's manager.
 * @property {string} home_club_name - The name of the home club.
 * @property {string} home_club_position - The position of the home club.
 * @property {string} outcome - The outcome of the game.
 * @property {string} referee - The referee of the game.
 * @property {string} round - The round of the game.
 * @property {number} season - The season of the game.
 * @property {string} stadium - The stadium of the game.
 * @property {number} total_goals - The total number of goals in the game.
 * @property {string} url - The URL of the game.
 * @property {Array<string>} game_events - The IDs of the game events associated with the game.
 * @property {Array<string>} game_lineups - The IDs of the game lineups associated with the game.
 */

const gameSchema = new mongoose.Schema({
  _id: String,
  aggregate: Number,
  attendance: Number,
  away_club_goals: Number,
  away_club_id: Number,
  away_club_manager_name: String,
  away_club_name: String,
  away_club_position: String,
  competition_id: String,
  competition_type: String,
  date: Date,
  game_id: Number,
  home_club_goals: Number,
  home_club_id: Number,
  home_club_manager_name: String,
  home_club_name: String,
  home_club_position: String,
  outcome: String,
  referee: String,
  round: String,
  season: Number,
  stadium: String,
  total_goals: Number,
  url: String,
  game_events: [{ type: mongoose.Schema.Types.ObjectId, ref: "game_events" }],
  game_lineups: [{ type: mongoose.Schema.Types.ObjectId, ref: "game_lineups" }],
});

/**
 * Represents a Mongoose model for games.
 * @type {import("mongoose").Model<Game>}
 */
const Game = mongoose.model("games", gameSchema);

module.exports = Game;
