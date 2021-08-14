// requires mysql2, or similar, addon

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME_CLEARDB,
  process.env.DB_USER_CLEARDB,
  process.env.DB_PASS_CLEARDB,
  {
    host: process.env.DB_HOST_CLEARDB,
    dialect: "mysql",
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
