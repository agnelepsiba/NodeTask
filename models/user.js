const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; 


const findUserByUsername = (username) => users.find(user => user.username === username);

const registerUser = (username, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { username, password: hashedPassword };
  users.push(user);
  return user;
};

const authenticateUser = (username, password) => {
  const user = findUserByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }
  const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
  return { user, token };
};

module.exports = { registerUser, authenticateUser };
