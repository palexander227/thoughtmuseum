const express = require("express");
const router = express.Router();

const { deleteWorkSpace, createWorkSpace } = require("../../controller/workspace");

router.post("/create", createWorkSpace);
router.post("/delete", deleteWorkSpace); // route is directing as GET

module.exports = router;