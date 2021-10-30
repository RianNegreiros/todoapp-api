"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class passwordValidator {
  isValid(password) {
    const passwordRegexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return passwordRegexp.test(password);
  }

}

var _default = new passwordValidator();

exports.default = _default;