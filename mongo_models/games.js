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
});

const Game = mongoose.model("games", gameSchema);

module.exports = Game;
