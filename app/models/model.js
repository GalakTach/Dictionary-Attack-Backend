const mongoose = require("mongoose");

//This is a model for the data we push into MongoDB
const AppSchema = mongoose.Schema({
  username: String,
  highscore: Number,
  time: String
});

module.exports = mongoose.model("App", AppSchema);