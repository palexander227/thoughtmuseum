const express = require("express");
const session = require("express-session");
const sequelize = require("./config/connection");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const initializePassport = require("./passport-config");
// initializePassport(
//   passport,
//   (email) => users.find((user) => user.email === email),
//   (id) => users.find((user) => user.id === id)
// );

// const users = [];

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Static
app.use(express.static("public"));
app.use(flash());

// Form data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// Session
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "session-secret",
//     store: new SequelizeStore({
//       db: sequelize,
//     }),
//     resave: false, // we support the touch method so per the express-session docs this should be set to false
//     proxy: true, // if you do SSL outside of node.
//     saveUninitialized: true,
//   })
// );

// const middleware = passport(library);
// app.use(middleware.initialize());
// app.use(middleware.session());

app.set("view engine", "ejs");
app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// - models
// - views (signin, signup)

/*TODO:  enable flash messages:
Global variables
  .use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  })

  */
