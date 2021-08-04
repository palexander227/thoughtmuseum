const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const Person = require('../models/Person')

module.exports = function(passport){

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Person.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
          // Match user
          User.findOne({
            email: email
          }).then(user => {
            if (!user) {
              return done(null, false, { message: 'Either your email or your password was not quite right.' });
            }
    
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Either your email or your password was not quite right.' });
              }
            });
          });
        }) 
    )
}
