const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

class JwtStrategy extends JWTStrategy {
  constructor() {
    super(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_TOKEN_SECRET
      },
      (jwtPayload, cb) => {
        return cb(null, jwtPayload);
      }
    );
  }
}

module.exports = JwtStrategy;
