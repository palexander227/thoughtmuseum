// requires mysql2, or similar, addon

const { Sequelize } = require("sequelize");

let DB_HOST = process.env.CLEARDB_DATABASE_URL;
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: DB_HOST,
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
