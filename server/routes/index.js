const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { docker } = require('../services/docker');

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

router.get(
  '/containers',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let containers = await docker.listContainers();
      res.json(containers);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
