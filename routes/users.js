// Router
const express = require("express");
const router = express.Router();

// Auth
const { forwardAuthenticated } = require("../config/auth");

// Controller
const { register, login, logout } = require("../controller/user");

// Pages
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
router.get("/register", forwardAuthenticated, (req, res) => res.render("register"));

// API
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
