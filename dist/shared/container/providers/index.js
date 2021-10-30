"use strict";

var _tsyringe = require("tsyringe");

var _DateProvider = require("./DateProvider/DateProvider");

_tsyringe.container.registerSingleton('DateProvider', _DateProvider.DateProvider);