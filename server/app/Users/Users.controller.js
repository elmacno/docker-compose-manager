const { Users } = require('./Users.model');

const getUsers = async (req, res) => {
  res.send(Users.all());
};

const getUser = async (req, res) => {
  try {
    res.send(Users.findById(req.params.username));
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const createOrUpdateUser = async (req, res) => {
  try {
    res.send(Users.createOrUpdate(req.params.username, req.body));
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    Users.delete(req.params.username);
    res.send({ msg: `User ${req.params.username} deleted successfully.` });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createOrUpdateUser,
  deleteUser
};
