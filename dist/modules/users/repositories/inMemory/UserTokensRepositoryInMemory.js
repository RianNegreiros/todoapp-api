"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTokensRepositoryInMemory = void 0;

var _UserTokens = require("../../infra/typeorm/entities/UserTokens");

class UserTokensRepositoryInMemory {
  constructor() {
    this.userTokens = [];
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }) {
    const userToken = new _UserTokens.UserTokens();
    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshTokens(user_id, refresh_token) {
    const userToken = this.userTokens.filter(ut => ut.user_id == user_id && ut.refresh_token && refresh_token);
    return userToken[0];
  }

  async deleteById(id) {
    const userToken = this.userTokens.filter(ut => ut.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken[0]));
  }

}

exports.UserTokensRepositoryInMemory = UserTokensRepositoryInMemory;