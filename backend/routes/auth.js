const express = require("express");
const UserModel = require("../models/User");
const { checkSchema, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const JWT_SECRET_KEY = "*#*#1234*#*#";

//route to create a new user
router.post(
  "/createUser",
  checkSchema({
    name: { minLength: 5 },
    email: { isEmail: true },
    password: { notEmpty: true },
  }),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.send({ error: error.array() });
      }

      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "a user with this mail id already exists" });
      }
      var salt = await bcrypt.genSalt(10);
      var hash = await bcrypt.hash(req.body.password, salt);
      user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      const jwtData = {
        user: {
          id: user.id,
        },
      };
      const auth_token = jwt.sign(jwtData, JWT_SECRET_KEY);

      res.json({ auth_token });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

//route to login
router.post(
  "/login",
  checkSchema({
    email: { isEmail: true },
    password: { notEmpty: true },
  }),
  async (req, res) => {
    let success = false;
    ///if email and password entered are not valid
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(500).send(error);
    }
    const { email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email: email });
      if (!user) {
        return res
          .status(500)
          .json({ success, error: "please use valid credentials" });
      }
      const passCheck = await bcrypt.compare(password, user.password);
      if (!passCheck) {
        return res
          .status(500)
          .json({ success, error: "please use valid credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const auth_token = await jwt.sign(payload, JWT_SECRET_KEY);
      if (auth_token) success = true;
      return res.json({ success, auth_token });
    } catch (e) {
      console.log(e);
      res.status(500).send("errror");
    }
  }
);

//route to get details of a logged in user
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userid = req.user.id;
    user = await UserModel.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(e);
    res.status(500).send("errror");
  }
});
module.exports = router;
