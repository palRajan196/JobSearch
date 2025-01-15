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

const coresOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, DELETE, PUT,PATCH, HEAD",
  credentials: true,
};
app.use(cors(coresOptions));

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

app.post("/Getjob", async (req, resp) => {
  const getJobs = await Job.find();
  resp.send(getJobs);
});

app.post("/JobsData/:id", async (req, resp) => {
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

cloudinary.config({
  cloud_name: "diz0non2m",
  api_key: "423261783484933",
  api_secret: "_fl_rhzlflvEJ6Y5J9McdPoVSHY",
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

app.listen(6005);
