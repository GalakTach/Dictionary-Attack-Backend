const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
  username: String,
  highscore: Number,
  time: String
});

module.exports = mongoose.model("App", AppSchema);