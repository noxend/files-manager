const { Strategy, ExtractJwt } = require('passport-jwt');
const { User: UserModel } = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, cb) => {
      try {
        const userData = await UserModel.selectByKey('id', payload.id);
        if (userData) {
          cb(null, userData);
        } else {
          cb(null, false);
        }
      } catch (err) {
        cb(err);
      }
    }),
  );
};
