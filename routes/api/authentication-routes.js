const router = require('express').Router();
const { Person } = require('../../models');
const passport = require("passport")
const bcrypt = require('bcryptjs')
// The `/api/categories` endpoint
//assuming for this rollout, we are only identifying them by username and id
//for this demo----consider the following routine
/* create student account --- coolkid123
create teacher --- teacher123
THEN teacher LOGSIN AND creates workspace
teacher assigns student to the workspace
teacher adds post to workspace

NOW login as student --- student can view list of workspaces
student accesses workspace and can view "first post"
student comments on the post the teacher makes

teacher logs in, views the student response(comment) and comments back, and posts a link*/


router.post('/register-teacher', async (req, res, next) => {
  console.log(`/api/register-teacher | ${req.body.username} ${req.body.password}`) 
  Person.create({
    username: req.body.username,
    first_name: req.body.username, // TODO Get the data from the form/for next time
    last_name:  req.body.username, // TODO Get the data from the form/for next time
    password: bcrypt.hashSync(req.body.password),
    role: Person.ROLES.Teacher
  }).then(() => {
    res.redirect("/login")
  }).catch(next)
});


router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

if (process.env.NODE_ENV !== "production") {
  
router.get('/session', (req, res) => {
  res.json(req.session)
});
}

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect("/")
});



module.exports = router;
