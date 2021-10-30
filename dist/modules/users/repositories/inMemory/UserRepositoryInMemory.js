"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepositoryInMemory = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _User = require("../../infra/typeorm/entities/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async createUser({
    username,
    email,
    password
  }) {
    const user = new _User.User();
    const passwordHashed = await _bcrypt.default.hash(password, 12);
    Object.assign(user, {
      username: username,
      email: email,
      password: passwordHashed
    });
    this.users.push(user);
  }

  async findUserById(id) {
    const user = this.users.filter(user => user.id === id);
    return user[0];
  }

  async findUserByEmail(email) {
    const user = this.users.filter(user => user.email === email);
    return user[0];
  }

}

exports.UserRepositoryInMemory = UserRepositoryInMemory;