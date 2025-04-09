const express = require("express");
const router = express.Router();
const User = require("../DataBase/Users");

router.post("/Register", async (req, resp) => {
  try {
    const productdata = new User(req.body);
    const result = await productdata.save();
    resp.send(result);
  } catch (err) {
    resp.status(404).json(err);
  }
});

router.post("/Login", async (req, resp) => {
  try {
    const Logintdata = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    resp.send(Logintdata);
  } catch (err) {
    resp.status(404).json(err);
  }
});

module.exports = router;
