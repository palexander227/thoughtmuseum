// requires mysql2, or similar, addon

const { Sequelize } = require("sequelize");

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    process.env.DB_NAME_CLEARDB,
    process.env.DB_USER_CLEARDB,
    process.env.DB_PASS_CLEARDB,
    {
      host: process.env.DB_HOST_CLEARDB,
      dialect: "mysql",
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
    }
  );
}

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
