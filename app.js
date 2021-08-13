const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const env = require("dotenv");
const path = require("path");

const app = express();

//Env veriable
env.config();

// // Passport Config
require("./config/passport")(passport);

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));

// EJS
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user;
  next();
});

// Routes
app.use(require("./routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
