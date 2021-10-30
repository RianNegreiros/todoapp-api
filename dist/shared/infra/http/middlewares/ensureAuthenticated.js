"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is required');
  }

  const [, token] = authHeader.split(' ');

  try {
    (0, _jsonwebtoken.verify)(token, _auth.default.jwt_token);
    next();
  } catch {
    throw new Error('Invalid token');
  }
}