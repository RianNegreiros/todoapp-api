"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class emailValidator {
  isValid(email) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email);
  }

}

var _default = new emailValidator();

exports.default = _default;