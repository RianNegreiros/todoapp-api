"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _IUserRepository = require("../../repositories/IUserRepository");

var _IUserTokensRepository = require("../../repositories/IUserTokensRepository");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUserTokensRepository.IUserTokensRepository === "undefined" ? Object : _IUserTokensRepository.IUserTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(userRepository, userTokensRepository, dateProvider) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('Email or password incorrect');
    }

    const validate = await _bcrypt.default.compare(password, user.password);

    if (!validate) {
      throw new Error('Email or password incorrect');
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_token
    });
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.refresh_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    const refresh_token_expires_date = this.dateProvider.addDays(_auth.default.refresh_token_expires_date);
    await this.userTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token: refresh_token
    });
    return {
      username: user.username,
      email: user.email,
      token: token
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;