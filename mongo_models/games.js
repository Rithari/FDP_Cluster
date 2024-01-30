const mongoose = require("mongoose");

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

const Game = mongoose.model("games", gameSchema);

const gameEventSchema = new mongoose.Schema({
  _id: String,
  club_id: Number,
  date: Date,
  description: String, // Use this to do a 'contain' search in the string for Yellow/Red Card, Goal and such
  // 60% of the events description is 'Not reported'
  game_event_id: String,
  game_id: Number,
  minute: Number,
  player_assist_id: Number,
  player_id: Number,
  player_in_id: Number,
  type: String, // 'Substitutions', 'Goals', 'Cards', 'Shootout'
  year: Number,
});

const GameEvent = mongoose.model("game_events", gameEventSchema);

const gameLineupSchema = new mongoose.Schema({
  _id: String,
  club_id: Number,
  game_id: Number,
  game_lineups_id: String,
  number: String, // the tshirt number
  player_id: Number,
  player_name: String,
  position: String, // Use this to parse position on the field
  team_captain: Number, // 0 or 1
  type: String, // 'Starting Lineup', 'Substitutes'
});

const GameLineup = mongoose.model("game_lineups", gameLineupSchema);

module.exports = {
  Game: mongoose.model("games", gameSchema),
  GameEvent: mongoose.model("game_events", gameEventSchema),
  GameLineup: mongoose.model("game_lineups", gameLineupSchema),
};
