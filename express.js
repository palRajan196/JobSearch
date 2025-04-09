const mongoose = require("mongoose");
const configuser = require("./config");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT || 6005;
const FrontEndURL = process.env.FrontEndURL;



// const coresOptions = {
//   origin : FrontEndURL,
// //  origin : "https://jobsearchfrontend.onrender.com",
//   methods: "GET, POST, DELETE, PUT,PATCH, HEAD",
//   credentials: true,
// };
//app.use(cors(coresOptions));
app.use(cors());

const User = require("./Routes/Login");
const Job = require("./Routes/Job");
const ApplyJob = require("./Routes/ApplyJob");

app.use("/", User);
app.use("/", Job);
app.use("/", ApplyJob);



app.listen(PORT,()=>{
  console.log(`Port is running on ${PORT}`);
});
