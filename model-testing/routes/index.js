const express = require("express");
const router = express.Router();
const getStudents = require('../utils/get-students');
const {getWorkspacesByTeacherId, getWorkspacesByStudentId} = require('../utils/get-workspaces');
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Home Page
router.get("/", forwardAuthenticated, (req, res) => res.render("index"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  const { id, role } = req.user;
  const students = await getStudents();
  let workspaces;

  if(role.toLowerCase() === "teacher" ) {
    workspaces = await getWorkspacesByTeacherId(id);
  } else {
    workspaces = await getWorkspacesByStudentId(id)
  }

  res.render("dashboard", {
    role,
    students,
    workspaces
  })
});

// Myclass
router.get("/myclass", ensureAuthenticated, (req, res) => {
  res.render("myclass")
});

module.exports = router;
