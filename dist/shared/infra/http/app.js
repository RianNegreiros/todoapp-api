"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../../../../swagger.json"));

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _routes = require("./routes");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use('api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use(_routes.router);