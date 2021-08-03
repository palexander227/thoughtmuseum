const express = require('express');

// import sequelize connection
// const {Sequelize} = require('sequelize');

// const sequelize = new Sequelize('thoughtmuseum_db', 'root', 'remaininthelight', {
//   host: 'localhost',
//   dialect: 'mysql'
// });
const routes = require('./routes');

// sequelize.authenticate()
//     .then(function () {
//         console.log("CONNECTED! ");
//     })
//     .catch(function (err) {
//         console.log("SOMETHING DONE GOOFED");
//     })
//     .done();






const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// - models
// - views (signin, signup)
