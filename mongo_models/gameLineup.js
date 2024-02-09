const mongoose = require("mongoose");
/**
 * Represents a game lineup.
 * @typedef {Object} GameLineup
 * @property {string} _id - The ID of the game lineup.
 * @property {number} club_id - The ID of the club.
 * @property {number} game_id - The ID of the game.
 * @property {string} game_lineups_id - The ID of the game lineup.
 * @property {string} number - The t-shirt number of the player.
 * @property {number} player_id - The ID of the player in the lineup.
 * @property {string} player_name - The name of the player in the lineup.
 * @property {string} position - The position of the player on the field.
 * @property {number} team_captain - Indicates if the player is the team captain (0 or 1).
 * @property {string} type - The type of the game lineup.
 */

const gameLineupSchema = new mongoose.Schema({
  _id: String,
  club_id: Number,
  game_id: Number,
  game_lineups_id: String,
  number: String,
  player_id: Number,
  player_name: String,
  position: String,
  team_captain: Number,
  type: String,
});

/**
 * Represents a Mongoose model for game lineups.
 * @type {import("mongoose").Model<GameLineup>}
 */
const GameLineup = mongoose.model("game_lineups", gameLineupSchema);

module.exports = GameLineup;
