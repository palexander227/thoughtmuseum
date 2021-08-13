const Post = require("../models/Post");
const Comment = require("../models/Comment");
const moment = require("moment");
const { getComments } = require("./comment");

exports.createPost = async (req, res, next) => {
  const { classid, studentid, teacherid, workspaceid } = req.params;

  try {
    const { user } = res.locals;
    const { content } = req.body;
    const newPost = new Post({
      workspaceid,
      userid: user.id,
      username: user.username,
      userrole: user.role,
      content,
      studentid,
    });
    const savePost = await newPost.save();
    if (savePost) {
      req.flash("success_msg", "Post created successfully");
      res.redirect(
        `/myclass?classid=${classid}&studentid=${studentid}&teacherid=${teacherid}&workspaceid=${workspaceid}`
      );
    } else {
      throw "Cannot create at the moment!";
    }
  } catch (error) {
    req.flash("error_msg", error);
    console.log(error);
  }
};

exports.getPost = async (req, res, next) => {
  const { classid: workspaceid } = req.query;
  const comments = await getComments();

  try {
    const posts = await Post.findAll();

    res.locals.post = posts
      .filter((post) => post.workspaceid === parseInt(workspaceid))
      .map((item) => ({
        id: item.id,
        date: moment(item.dataValues.createdAt).utc().format("MMM Do"),
        username: item.dataValues.username,
        content: item.dataValues.content,
        comments: comments.filter(({ postid }) => postid === item.id)
      }));
  } catch (error) {
    console.log(error);
  }

  next();
};
