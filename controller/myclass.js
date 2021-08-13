const Workspace = require("../models/Workspace");

//GET MY CLASS BY ID
exports.getMyclass = async (req, res, next) => {
  const { classid } = req.query;
  try {
    const result = await Workspace.findByPk(classid);
    if (result) {
      res.locals.myclass = result.dataValues;
    }
  } catch (err) {
    res.redirect("/dashboard");
    console.log(err);
  }
  next();
};

exports.renderMyClass = (req, res) => {
  const { classid } = req.query;

  if (res.locals.workspace.length === 0) {
    res.redirect("/dashboard");
  } else {
    res.render("myclass", {
      name: req.user.username,
      role: req.user.role,
      myclass: res.locals.myclass,
      post: res.locals.post,
      classid
    });
  }
};