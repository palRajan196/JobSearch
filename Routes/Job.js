const express = require("express");
const router = express.Router();
const Job = require("../DataBase/JobDB");

router.put("/Update/:id3", async (req, resp) => {
  try {
    const updatedata = await Job.updateOne(
      { _id: req.params.id3 },
      { $set: req.body }
    );
    resp.send(updatedata);
  } catch (err) {
    resp.status(404).json(err);
  }
});

router.post("/AddJob", async (req, resp) => {
  try {
    const JobData = new Job(req.body);
    const jobResult = await JobData.save();
    resp.send(jobResult);
  } catch (err) {
    resp.status(404).json(err);
  }
});

router.get("/Getjob", async (req, resp) => {
  try {
    const getJobs = await Job.find();
    resp.send(getJobs);
  } catch (err) {
    resp.status(404).json(err);
  }
});

router.get("/JobsData/:id", async (req, resp) => {
  try {
    const jobsData = await Job.findOne({ _id: req.params.id });
    resp.send(jobsData);
  } catch (err) {
    resp.status(404).json(err);
  }
});

router.delete("/controleDlt/:id", async (req, resp) => {
  try {
    const ControleDlt = await Job.deleteOne({ _id: req.params.id });
    resp.send(ControleDlt);
  } catch (err) {
    resp.status(404).json(err);
  }
});

module.exports = router;
