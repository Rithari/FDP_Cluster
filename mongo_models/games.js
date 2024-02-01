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

module.exports = {
  Game,
  GameEvent,
  GameLineup,
};
