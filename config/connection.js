require("dotenv").config();

const Sequelize = require("sequelize");

//  drop database thoughtmuseum_db; create database thoughtmuseum_db; use thoughtmuseum_db

// const sequelize = process.env.JAWSDB_URL
// ? new Sequelize(process.env.JAWSDB_URL)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

module.exports = sequelize;
