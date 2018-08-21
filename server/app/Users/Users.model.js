const { db } = require('../../services/db');

class Users {
  static all() {
    db.reload();
    return db.getData('/users');
  }

  static findByUsername(username) {
    db.reload();
    let results = db
      .getData('/users')
      .filter(user => user.username === username);
    if (results.length !== 1) {
      throw new Error(
        results.length === 0
          ? `No user with username '${username}' found`
          : `Multiple users with username '${username}' id found`
      );
    }
    return results[0];
  }

  static createOrUpdate(username, updatedUser) {
    db.reload();
    let updated = false;
    let users = db.getData('/users').map(user => {
      if (user.username === username) {
        updated = true;
        updatedUser = { ...user, ...updatedUser };
        return updatedUser;
      } else {
        return user;
      }
    });
    if (!updated) {
      users.push(updatedUser);
    }
    db.push('/users', users);
    return updatedUser;
  }

  static delete(username) {
    db.reload();
    let users = db.getData('/users').filter(user => user.username !== username);
    db.push('/users', users);
  }
}

module.exports = {
  Users
};
