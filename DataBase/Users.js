const mongoose = require("mongoose");
require("dotenv").config();
const MongoURL = process.env.MongoURL;
const MongoURL_Local = process.env.MongoURL_Local;

// mongoose.connect(MongoURL_Local);
mongoose.connect(MongoURL);
const productSchema = new mongoose.Schema({
  name:{
       type:String,
  },
  email:{
       type:String,
       unique: true,
  },
  password:{
        type:String,
  },
});
//module.exports = mongoose.model("products", productSchema);

module.exports = mongoose.model("logindatas", productSchema);

