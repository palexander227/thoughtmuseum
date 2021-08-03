const router = require('express').Router();
const apiRoutes = require('./api');

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