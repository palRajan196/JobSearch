const mongoose = require("mongoose");
require("dotenv").config();
const MongoURL = process.env.MongoURL;
const MongoURL_Local = process.env.MongoURL_Local;

// mongoose.connect(MongoURL_Local);
mongoose.connect(MongoURL);

const JobSchema = new mongoose.Schema({
  Title: String,
  Category: String,
  Country: String,
  City: String,
  Location: String,
  Description: String,
  JobPosted: String,
  Salary: String,
});

module.exports = mongoose.model("addjobs", JobSchema);
