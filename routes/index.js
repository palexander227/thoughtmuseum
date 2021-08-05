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

teacher logs in, views the student response(comment) and comments back, and posts a link

TO DO: 1) have to build the standard login page and routes associated with it
2) we have to build a create workspace form only accessible by teacher; a feature of this
is 'select student' --- note: assumes student is already registed in the database.
3) build dashboard view which contains list of workspaces
4) build workspace view which lists the posts
5) add post and add comment feature both require new api routes
note: add post includes and link as a feature*/











const router = require('express').Router();
const apiRoutes = require('./api');
const passport = require('passport');

require('../config/passport')(passport);

router.get('/register-teacher', (req, res) => {
  res.render('teacherRegister')
})

router.get('/register-student', (req, res) => {
  res.render('studentRegister')
})


// The wanted route you want to server
// GET /users
//  is not found? --> 404 Not Found
//  server error? --> 500

/*
// GET /logout 
// GET /foobar
[
  json(),           // parse json post data
  urlencoded(),     // form data
  session()
  authentication(), // passport etc
  api
    login
    signup
    logout
     -> end the request (sending the response)
        res.end("...")
        res.send(...)
        res.redirect()
        res.json()
        res.render(...)
      
]
*/


// getUsers().then(...).catch(next)

router.use('/api', apiRoutes);

router.get("/", (req, res) => {
  res.render('index');
})

router.get('/login', (req, res) => {
  console.log('I am here')
  res.render('login');
});

router.get('/home', (req, res) => {
  console.log('user test:', req.user)
  console.log('session test:', req.session)
  if (req.user && req.session.passport.user) {
    res.render('authenticatedHome', { user: req.user })
  } else {
    res.status(500).send('Not authorized')
  }
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next)

})

const showNotFound = res => {
  res.status(404).render("404")
  // TODO 404 page (using ejs render)
}

// 404 - Not found
router.use((req, res, next) => {
 showNotFound(res)
});


// Handle errors
router.use((err, req, res, next) => {

  // Not found errors
  if (err.code === "ENOENT" || err.statusCode === 404) {
    return showNotFound(res)
  }

  if (err.statusCode === undefined) {
    err.statusCode = 500
  }

  if (err.statusCode < 500) {
    return res.status(err.statusCode).send(err.message)
  }
  // 
  //if (err.code === "EBADCSRFTOKEN") {
  //    return this._handleRoute(req, res, options.badCsrf, [err], next)
  //}

  // 500 - Server crashes
  console.error(err.stack)

  let errMsg = err.stack
  if (process.env.NODE_ENV === "production") {
    errMsg = "Internal server error."
  }
  res.status(500).end(errMsg)
});



module.exports = router;