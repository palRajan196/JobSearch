const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/E-comm");
const productSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("products", productSchema);
