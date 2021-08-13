const express = require("express");
const router = express.Router();

const { createComment, getComment } = require("../../controller/comment");

router.get("/", getComment);
router.post("/create/:id/:teacherid/:studentid/:postid", createComment);

module.exports = router;