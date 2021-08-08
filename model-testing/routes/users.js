const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const Userdata = require("../models/user");

const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register
router.post("/register", async (req, res) => {
  const { username, email, pass, password2, role } = req.body;
  let errors = [];

  console.log(req.body);

  if (!username || !email || !pass || !password2 || !role) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (pass != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (pass.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      email,
      pass,
      password2,
    });
  }

  const password = await bcrypt.hash(pass, 10);
  try {
    const alreadyExistsUser = await Userdata.findOne({ where: { email } });
    if (alreadyExistsUser) {
      req.flash("success_msg", "Email already exist");
      res.redirect("/register");
    } else {
      const newUser = new Userdata({ username, email, password, role });
      const savedUser = await newUser.save();
      if (savedUser) {
        req.flash("success_msg", "Registered successfully");
        res.redirect("/login");
      } else {
        throw "Cannot register user at the moment!";
      }
    }
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
});

module.exports = router;
