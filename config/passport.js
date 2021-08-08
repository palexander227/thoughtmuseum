// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcryptjs')
// const Person = require('../models/Person')

// module.exports = function(passport){

//     // used to serialize the user for the session
//     passport.serializeUser(function(user, done) {
//       console.log('user test:', user)
//         done(null, user.id);
//     });

//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
//         console.log('id test', id)
//         Person
//           .findByPk(id)
//           .then(person => {
//             console.log('b test')
//             done(null, person);
//           })
//           .catch(error => {
//             console.log('error test:', error)
//             done(error)
//           })
//     });

//     return passport.use(
//         new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
//           // Match user

//           console.log('username', username)
//           console.log('passowrd test:', password)
//           Person.findOne({
//             where: { username }
//           }).then(person => {
//             console.log('person test:', person)
//             if (!person) {
//               return done(null, false, { message: 'Either your username or your password was not quite right.' });
//             }

//             console.log('person.password test:', person.password)

//             // Match password
//             bcrypt.compare(password, person.password, (err, isMatch) => {
//               console.log('bcrypt err:', err)
//               console.log('isMatch test:', isMatch)
//               if (err) throw err;
//               if (isMatch) {
//                 return done(null, person);
//               } else {
//                 return done(null, false, { message: 'Either your username or your password was not quite right.' });
//               }
//             });
//           });
//         })
//     )
// }
