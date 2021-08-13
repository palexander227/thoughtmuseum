const express = require("express");
const router = express.Router();

// Auth
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Controllers
const { renderDashboard } = require("../controller/dashboard");
const { getMyclass, renderMyClass } = require("../controller/myclass");
const { getPost } = require("../controller/post");
const { getAllUser } = require("../controller/user");
const { getWorkSpace } = require("../controller/workspace");

// Routes
const apiRoutes = require('./api');
const userRoutes = require('./users');

router.use(userRoutes);
router.use("/api", apiRoutes);

// Home Page
router.get("/", forwardAuthenticated, (req, res) => res.render("index"));

// Dashboard
router.get(
  "/dashboard",
  ensureAuthenticated,
  getWorkSpace,
  getAllUser,
  renderDashboard
);

// Myclass
router.get(
  "/myclass",
  ensureAuthenticated,
  getWorkSpace,
  getMyclass,
  getPost,
  renderMyClass
);

module.exports = router;
