const passport = require('passport');
const jwt = require('jsonwebtoken');

const requireSignIn = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized'
      });
    } else {
      const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET);
      return res.json({ token, rights: user.rights });
    }
  })(req, res);
};

const requireAuthentication = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized'
      });
    } else {
      next();
    }
  })(req, res, next);
};

module.exports = {
  requireSignIn,
  requireAuthentication
};
