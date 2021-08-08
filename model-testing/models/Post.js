const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
class Post extends Model {}
//todo: add additional field for text vs. link --- perhaps for next time.
Post.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Post',
  }
);



module.exports = Post;