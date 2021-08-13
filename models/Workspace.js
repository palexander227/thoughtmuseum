const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/');
class Workspace extends Model {}

// sequelize.sync({force: true});

Workspace.init(
  {
    // define columns
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // description: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // }
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teachername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Workspace',
  }
);



module.exports = Workspace;