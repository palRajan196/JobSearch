const express = require("express");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const ApplyJob = require("../DataBase/Jobapply");
const cloud_Name = process.env.cloud_Name;
const Api_Key = process.env.Api_Key;
const Api_Secret = process.env.Api_Secret;

router.get("/submitteddata/:auth", async (req, resp) => {
  try {
    const data = await ApplyJob.find({ Id: req.params.auth });
    resp.send(data);
  } catch (err) {
    console.log(err);
    resp.send("Data Not Found");
  }
});
router.get("/responce", async (req, resp) => {
  try {
    const Responce_Data = await ApplyJob.find();
    resp.send(Responce_Data);
  } catch (err) {
    console.log(err);
    resp.status(404).json(err);
  }
});

router.delete("/submitdlt/:id", async (req, resp) => {
  try {
    const data = await ApplyJob.deleteOne({ _id: req.params.id });
    resp.send(data);
  } catch (err) {
    resp.status(404).json(err);
  }
});

// Convert Image to a String Formate
cloudinary.config({
  cloud_name: cloud_Name,
  api_key: Api_Key,
  api_secret: Api_Secret,
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

router.post("/applyJob", upload, async (req, resp) => {
  try {
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
  } catch (err) {
    resp.status(404).json(err);
  }
});

module.exports = router;
