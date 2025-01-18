const mongoose = require("mongoose");
require("dotenv").config();
const MongoURL = process.env.MongoURL;
const MongoURL_Local = process.env.MongoURL_Local;

//mongoose.connect(MongoURL_Local);
mongoose.connect(MongoURL);
const ImgSchema = new mongoose.Schema({
  Image: String,
  Name: String,
  Email: String,
  Mobile: Number,
  Location: String,
  Id: String,
});

// module.exports = mongoose.model("imagedbs", ImgSchema);
module.exports = mongoose.model("submitjobs", ImgSchema);