const mongoose = require("mongoose");

/**
 * Represents a game event.
 * @typedef {Object} GameEvent
 * @property {string} _id - The ID of the game event.
 * @property {number} club_id - The ID of the club.
 * @property {Date} date - The date of the game event.
 * @property {string} description - The description of the game event.
 * @property {string} game_event_id - The ID of the game event.
 * @property {number} game_id - The ID of the game.
 * @property {number} minute - The minute of the game event.
 * @property {number} player_assist_id - The ID of the player who assisted in the game event.
 * @property {number} player_id - The ID of the player involved in the game event.
 * @property {number} player_in_id - The ID of the player who came in as a substitute in the game event.
 * @property {string} type - The type of the game event.
 * @property {number} year - The year of the game event.
 */

const gameEventSchema = new mongoose.Schema({
  _id: String,
  club_id: Number,
  date: Date,
  description: String,
  game_event_id: String,
  game_id: Number,
  minute: Number,
  player_assist_id: Number,
  player_id: Number,
  player_in_id: Number,
  type: String,
  year: Number,
});

/**
 * Represents a Mongoose model for game events.
 * @type {import("mongoose").Model<GameEvent>}
 */
const GameEvent = mongoose.model("game_events", gameEventSchema);

module.exports = GameEvent;
