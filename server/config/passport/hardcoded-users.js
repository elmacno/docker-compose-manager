const LocalStrategy = require('passport-local').Strategy;

const users = [
  {
    username: 'admin',
    password: 'administrator',
    rights: ['admin']
  }
];

class HardCodedUsersStrategy extends LocalStrategy {
  constructor() {
    super((username, password, done) => {
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
