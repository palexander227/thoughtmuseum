// import models
const Person = require('./Person');
const Comment = require('./Comment');
const Post = require('./Post');
const Workspace = require('./Workspace');

// Workspace
Workspace.belongsTo(Person, {
  foreignKey: 'teacher_id'
});

Workspace.belongsTo(Person, {
  foreignKey: 'student_id'
});

// Comment
Comment.belongsTo(Post)
Comment.belongsTo(Person, {
  foreignKey: 'author_id'
})

// Post
Post.belongsTo(Workspace)
Post.belongsTo(Person, {
  foreignKey: 'author_id'
})

const sequelize = require('../config/connection.js');

sequelize.authenticate()
.then(function () {
    console.log("CONNECTED! ");
    sequelize.sync()
})
.catch(function (err) {
    console.log("SOMETHING DONE GOOFED");
})

module.exports = {
  Person,
  Comment,
  Post,
  Workspace
};
