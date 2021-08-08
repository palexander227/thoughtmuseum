const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Home Page
router.get("/", forwardAuthenticated, (req, res) => res.render("index"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    name: req.user.role,
  })
);

// Myclass
router.get("/myclass", ensureAuthenticated, (req, res) =>
  res.render("myclass")
);

module.exports = router;
