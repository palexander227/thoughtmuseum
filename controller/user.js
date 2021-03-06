const bcrypt = require("bcryptjs");
const passport = require("passport");
const Userdata = require("../models/User");

exports.getAllUser = async (req, res, next) => {
  console.log('CTRL USER | getAllUser ')

  const result = await Userdata.findAll();

  if (result.length > 0) {
    const { user } = res.locals;

    if (user.role === "teacher") {
      res.locals.students = result
        .filter(item => item.dataValues.role === "student")
        .map(item => item.dataValues);
    }
  }
  
  next();
};

// Register
exports.register = async (req, res) => {
  console.log('CTRL USER | register 1 ')

  const { username, email, pass, password2, role } = req.body;
  let errors = [];

  if (!username || !email || !pass || !password2 || !role) {
    errors.push({ msg: "Please enter all fields" });
  }
  if (pass != password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (pass.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  if (errors.length > 0) {
    return res.render("register", {
      errors,
      username,
      email,
      pass,
      password2,
    });
  }
  const password = await bcrypt.hash(pass, 10);
  try {
    const alreadyExistsUser = await Userdata.findOne({ where: { email } });
    if (alreadyExistsUser) {
      console.log('CTRL USER | register 2 | user already exists')
      req.flash("success_msg", "Email already exist");
      return res.redirect("/register");
    } else {
      console.log('CTRL USER | register 3 | creating new user')
      const newUser = new Userdata({ username, email, password, role });
      const savedUser = await newUser.save();
      if (savedUser) {
      console.log('CTRL USER | register 4 | registered!')

        req.flash("success_msg", "Registered successfully");
        return res.redirect("/login");
      } else {
        console.log('CTRL USER | register 5 | something went wrong when saving the user data')

        throw "Cannot register user at the moment!";
      }
    }
  } catch (err) {
    console.log('CTRL USER | register 6 | try/catch block - error')
    console.log(err);
    return res.redirect("/register");
  }
};

// Login
exports.login = (req, res, next) => {
  console.log('CTRL USER | login | attempting passport auth')
  // wrapping the login passport function in a try catch block to see if this is where unhandled promise is originating
  try{

    passport.authenticate("local", { // instead of passport we can use bcrypt compare()
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }catch (err){
    console.log('CTRL USER | login promise error', err)
  }
};

// Logout
exports.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
};