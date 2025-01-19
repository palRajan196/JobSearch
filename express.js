const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const User = require("./DataBase/Users");
const configuser = require("./config");
const Job = require("./DataBase/JobDB");
const ApplyJob = require("./DataBase/Jobapply");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT || 6005;
const FrontEndURL = process.env.FrontEndURL;
const cloud_Name = process.env.cloud_Name;
const Api_Key = process.env.Api_Key;
const Api_Secret = process.env.Api_Secret;


// const coresOptions = {
//   origin : FrontEndURL,
// //  origin : "https://jobsearchfrontend.onrender.com",
//   methods: "GET, POST, DELETE, PUT,PATCH, HEAD",
//   credentials: true,
// };
//app.use(cors(coresOptions));
app.use(cors());

app.post("/Register", async (req, resp) => {
  const productdata = new User(req.body);
  const result = await productdata.save();
  resp.send(result);
});

app.post("/Login", async (req, resp) => {
  const Logintdata = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  resp.send(Logintdata);
});

app.put("/Update/:id3", async (req, resp) => {
  const updatedata = await Job.updateOne(
    { _id: req.params.id3 },
    { $set: req.body }
  );
  resp.send(updatedata);
});

app.post("/AddJob", async (req, resp) => {
  const JobData = new Job(req.body);
  const jobResult = await JobData.save();
  resp.send(jobResult);
});

app.get("/Getjob", async (req, resp) => {
  const getJobs = await Job.find();
  resp.send(getJobs);
});

app.get("/JobsData/:id", async (req, resp) => {
  const jobsData = await Job.findOne({ _id: req.params.id });
  resp.send(jobsData);
});

app.delete("/controleDlt/:id", async (req, resp) => {
  const ControleDlt = await Job.deleteOne({ _id: req.params.id });
  resp.send(ControleDlt);
});

app.get("/submitteddata/:auth", async (req, resp) => {
  try {
    const data = await ApplyJob.find({ Id: req.params.auth });
    resp.send(data);
  } catch (err) {
    console.log(err);
    resp.send("Data Not Found");
  }
});
app.get("/responce", async (req, resp) => {
  const Responce_Data = await ApplyJob.find();
  resp.send(Responce_Data);
});

app.delete("/submitdlt/:id", async (req, resp) => {
  const data = await ApplyJob.deleteOne({ _id: req.params.id });
  resp.send(data);
});

// Convert Image to a String Formate
cloudinary.config({
  cloud_name : cloud_Name,
  api_key : Api_Key,
  api_secret : Api_Secret,
});

const uploadResult = async (url) => {
  const result = await cloudinary.uploader.upload(url).catch((error) => {
    console.log(error);
    console.log(result);
  });

  return result;
};

const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Image");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("file");

app.post("/applyJob", upload, async (req, resp) => {
  const result = await uploadResult(req.file.path);
  let data = new ApplyJob({
    Image: result.secure_url,
    Name: req.body.name,
    Email: req.body.email,
    Mobile: req.body.mobileNo,
    Location: req.body.location,
    Id: req.body.auth,
  });
  data = await data.save();
  resp.send(data);
});

app.listen(PORT,()=>{
  console.log(`Port is running on ${PORT}`);
});
