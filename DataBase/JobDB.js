const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/E-comm");
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

module.exports = mongoose.model("jobdbs", JobSchema);
