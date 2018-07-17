const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (!user) {
      return res.status(401).send({
        msg: err
      });
    } else {
      const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET);
      return res.json({ token, rights: user.rights });
    }
  })(req, res);
});

router.get('/', passport.authenticate('jwt'), (req, res) => {
  res.json({ page: 'index', contents: { title: 'Express' } });
});

module.exports = router;
