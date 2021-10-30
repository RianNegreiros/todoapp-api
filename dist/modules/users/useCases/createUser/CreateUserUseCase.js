"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = require("../../repositories/IUserRepository");

var _emailValidator = _interopRequireDefault(require("../../validation/emailValidator"));

var _passwordValidator = _interopRequireDefault(require("../../validation/passwordValidator"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    username,
    email,
    password,
    confirmPassword
  }) {
    if (_passwordValidator.default.isValid(password) === false || _passwordValidator.default.isValid(confirmPassword) === false) {
      throw new Error('Password does not match requirements');
    }

    if (_emailValidator.default.isValid(email) === false) {
      throw new Error('Invalid email');
    }

    if (await this.userRepository.findUserByEmail(email)) {
      throw new Error('This email is already in use');
    }

    const newUser = this.userRepository.createUser({
      username,
      email,
      password
    });
    return newUser;
  }

}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;