const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.get("/user/get_all", async (req, res) => {
  try {
    res.send(await userModel.find({}));
  } catch (error) {
    console.log(error);
  }
});

router.post("/user/register", async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  if (username === undefined) {
    res.status(300).send("enter username");
  } else if (email === undefined) {
    res.status(300).send("enter email");
  } else if (password === undefined) {
    res.status(300).send("enter password");
  } else {
    const user = await userModel.findOne({ email });
    if (user && user.email === email) {
      res.status(300).send("user already exists");
    } else {
      bcrypt.hash(password, 5, function (err, hash) {
        if (err) {
          console.log(err);
        }
        try {
          new userModel({
            username: username,
            email: email,
            password: hash,
            isAdmin: isAdmin,
          }).save();
          res
            .status(200)
            .json({ username: username, email: email, isAdmin: isAdmin });
        } catch (error) {
          console.log(err);
        }
      });
    }
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === undefined) {
    res.status(300).send("enter email");
  } else if (password === undefined) {
    res.status(300).send("enter password");
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(400).send("user not found");
  } else {
    bcrypt.compare(password, user.password).then(function (result) {
      if (result) {
        res.status(200).json({
          email: user.email,
        });
      } else {
        res.status(301).send("invalid crediantials");
      }
    });
  }
});

module.exports = router;
