const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function() {
    passport.use(
        new LocalStrategy({
            usernameField: "email"
        }, (username, password, done) => {
          User.findOne({ username: username }, (err, user) => {
            if (err) { 
              return done(err);
            };
            if (!user) {
              return done(null, false, { msg: "Incorrect username" });
            }
            if (user.password !== password) {
              return done(null, false, { msg: "Incorrect password" });
            }
            return done(null, user);
          });
        })
      );
    
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}