const express = require("express");
const router = express.Router();

// Routes
const workspaceRoute = require('./workspace');
const postRoute = require('./post');
const commentRoute = require('./comment');

router.use("/workspace", workspaceRoute);
router.use("/post", postRoute);
router.use("/comment", commentRoute);

module.exports = router;
