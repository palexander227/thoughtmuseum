const express = require("express");
const router = express.Router();

const { createPost, getPost } = require("../../controller/post");

router.get("/", getPost);
router.post("/create/:classid/:studentid/:teacherid/:workspaceid", createPost);

module.exports = router;