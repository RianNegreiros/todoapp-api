"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _express = require("express");

var _CreateUserController = require("../../../../modules/users/useCases/createUser/CreateUserController");

const userRoutes = (0, _express.Router)();
exports.userRoutes = userRoutes;
const createUserController = new _CreateUserController.CreateUserController();
userRoutes.post('/register', createUserController.handle);