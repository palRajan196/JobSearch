const express = require("express");
const router = express.Router();
const User = require("../DataBase/Users");

router.post("/Register", async (req, resp) => {
  const productdata = new User(req.body);
  const result = await productdata.save();
  resp.send(result);
});

router.post("/Login", async (req, resp) => {
  const Logintdata = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  resp.send(Logintdata);
});

module.exports = router;