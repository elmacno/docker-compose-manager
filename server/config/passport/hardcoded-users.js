const LocalStrategy = require('passport-local').Strategy;
const { db } = require('../../services/db');

class HardCodedUsersStrategy extends LocalStrategy {
  constructor() {
    super((username, password, done) => {
      db.reload();
      let users = db.getData('/users');
      let user = users.find(
        e => e.username === username && e.password === password
      );

      if (!user) {
        done('Invalid username or password', false);
      } else {
        done(null, { username: user.username, rights: user.rights });
      }
    });
  }
}

module.exports = HardCodedUsersStrategy;
