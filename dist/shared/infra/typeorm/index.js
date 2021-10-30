"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async () => {
  const defaultOptions = await (0, _typeorm.getConnectionOptions)();
  const connection = await (0, _typeorm.createConnection)(Object.assign(defaultOptions, {
    database: process.env.NODE_ENV === 'test' ? 'todoapp_test' : defaultOptions.database
  }));
  console.log(`Database connect: ${connection.options.database}`);
  process.on('SIGINT', () => {
    connection.close().then(() => console.log('Database connection closed.'));
  });
  return connection;
};

exports.default = _default;