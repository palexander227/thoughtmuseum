const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/');
class Person extends Model {}

Person.ROLES = {
  Teacher: "Teacher",
  Student: "Student",
  Parent: "Parent",
  Admin: "Admin"
}

Person.init(
  {
    // define columns
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    // username: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   index: true
    // },
    // first_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // last_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // role: {
    //   type: DataTypes.ENUM(Object.keys(Person.ROLES)),
    //   allowNull: false,
    // }
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Userdata',
  }
);



module.exports = Person;