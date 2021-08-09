const express = require("express");
const router = express.Router();

// Load User model
const { Workspace } = require("../models/");

const { ensureAuthenticated, ensureAuthenticatedTeacher } = require("../config/auth");

router.get('/workspaces', ensureAuthenticated, async (req, res) => {
    try {
        const workspaces = await Workspace.findAll();
        res.json(workspaces);
    } catch (e) {
        res.json(null)
    }
})

router.post("/new-workspace", ensureAuthenticatedTeacher, async (req, res) => {
    const { name, description, studentId } = req.body;
    let errors = [];
  
    if (!name || !description) {
      errors.push({ msg: "Please enter all fields" });
    }
  
    try {
        const newWorkspace = new Workspace({ name, description,"teacher_id": req.user.id, "student_id": parseInt(studentId) });
        const savedWorkspace = await newWorkspace.save();
        if (savedWorkspace) {
            req.flash("success_msg", "Created successfully");
            res.redirect("/dashboard");
        } else {
            throw "Cannot register user at the moment!";
        }
    } catch (err) {
      console.log(err);
      console.log("WORKSPACE CREATION failed ...... redirect")
      res.redirect("/dashboard");
    }
});

module.exports = router;