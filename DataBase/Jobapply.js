const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/E-comm");
const ImgSchema = new mongoose.Schema({
  Image: String,
  Name: String,
  Email: String,
  Mobile: Number,
  Location: String,
  Id: String,
});

module.exports = mongoose.model("imagedbs", ImgSchema);
