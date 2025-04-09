const express = require("express");
const router = express.Router();
const Job = require("../DataBase/JobDB");

router.put("/Update/:id3", async (req, resp) => {
    const updatedata = await Job.updateOne(
      { _id: req.params.id3 },
      { $set: req.body }
    );
    resp.send(updatedata);
  });
  
  router.post("/AddJob", async (req, resp) => {
    const JobData = new Job(req.body);
    const jobResult = await JobData.save();
    resp.send(jobResult);
  });
  
  router.get("/Getjob", async (req, resp) => {
    const getJobs = await Job.find();
    resp.send(getJobs);
  });
  
  router.get("/JobsData/:id", async (req, resp) => {
    const jobsData = await Job.findOne({ _id: req.params.id });
    resp.send(jobsData);
  });
  
  router.delete("/controleDlt/:id", async (req, resp) => {
    const ControleDlt = await Job.deleteOne({ _id: req.params.id });
    resp.send(ControleDlt);
  });

  module.exports = router;