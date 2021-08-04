const express = require('express');
const session = require('express-session');
const sequelize = require("./config/connection")

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Static
app.use(express.static('public'))

// Form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "session-secret",
    store: new SequelizeStore({
      db: sequelize
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: true
  })
);

app.set('view engine', 'ejs');
app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// - models
// - views (signin, signup)
