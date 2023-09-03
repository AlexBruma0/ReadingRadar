// passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Assuming you have a User model

// Configure the LocalStrategy for username/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName', // Replace with your username field name
      passwordField: 'password', // Replace with your password field name
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'Invalid username' });
        }

        const isValidPassword = await user.verifyPassword(password);

        if (!isValidPassword) {
          return done(null, false, { message: 'Invalid password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT authentication strategy
passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: passport.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your-secret-key', // Replace with your JWT secret key
      },
      (jwtPayload, done) => {
        // Check if the user exists in your database
        User.findById(jwtPayload.userId, (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    )
  );

module.exports = passport;