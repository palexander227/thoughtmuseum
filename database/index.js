// requires mysql2, or similar, addon

const { Sequelize } = require("sequelize");

/*
var sequelize = new Sequelize('mysql://user:pass@example.com:9821/dbname', {
  // Look to the next section for possible options
})
*/

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  // Look to the next section for possible options
  dialect: "mysql"
});

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//   }
// );

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
