const Comment = require("../models/Comment");
const moment = require("moment");

exports.createComment = async (req, res, next) => {
  const { id, teacherid, studentid, postid } = req.params;

  try {
    const { user } = res.locals;
    const { content } = req.body;
    const newComment = new Comment({
      postid,
      userid: user.id,
      username: user.username,
      userrole: user.role,
      content,
      teacherid,
    });
    
    const saveComment = await newComment.save();

    if (saveComment) {
      console.log(saveComment);
      req.flash("success_msg", "Comment created successfully");
      res.redirect(
        `/myclass?classid=${id}&teacherid=${teacherid}&studentid=${studentid}&postid=${postid}`
      );
    } else {
      throw "Cannot create at the moment!";
    }
  } catch (error) {
    req.flash("error_msg", error);
    console.log(error);
  }
};

exports.getComment = async (req, res, next) => {
  const { teacherid } = req.query;

  const comments = [];
  try {
    const comment = await Comment.findAll();

    comments = comment
      .filter((item) => item.dataValues.teacherid === teacherid)
      .map((item) => ({
        date: moment(item.dataValues.createdAt).utc().format("MMM Do"),
        username: item.dataValues.username,
        content: item.dataValues.content,
      }));
  } catch (error) {
    console.log(error);
  }
  res.locals.comment = comments;
  next();
};

exports.getComments = async () => {
  let array = [];
  try {
    const comments = await Comment.findAll();

    array = comments.map((item) => ({
      postid: item.postid,
      date: moment(item.dataValues.createdAt).utc().format("MMM Do"),
      username: item.dataValues.username,
      content: item.dataValues.content,
    }));

  } catch (error) {
    console.log(error);
  }

  return array;
};
