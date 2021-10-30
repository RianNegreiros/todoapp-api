"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _authenticate = require("./authenticate.routes");

var _todo = require("./todo.routes");

var _user = require("./user.routes");

const router = (0, _express.Router)();
exports.router = router;
router.use('/users', _user.userRoutes);
router.use('/todos', _todo.todoRoutes);
router.use('/authentication', _authenticate.authenticateRoutes);