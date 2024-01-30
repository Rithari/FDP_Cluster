const mongoose = require("mongoose");

const uri = process.env.MONGODB;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;
