"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _typeorm = require("typeorm");

var _User = require("../entities/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async createUser({
    username,
    email,
    password
  }) {
    const passwordHashed = await _bcrypt.default.hash(password, 12);
    this.repository.create({
      username,
      email,
      password: passwordHashed
    });
  }

  async findUserById(id) {
    const user = await this.repository.findOneOrFail(id);
    return user;
  }

  async findUserByEmail(email) {
    const user = await this.repository.findOneOrFail({
      email
    });
    return user;
  }

}

exports.UserRepository = UserRepository;