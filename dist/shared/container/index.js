"use strict";

var _tsyringe = require("tsyringe");

var _TodoRepository = require("../../modules/todos/repositories/TodoRepository");

var _UserRepository = require("../../modules/users/infra/typeorm/repositories/UserRepository");

var _UserTokensRespository = require("../../modules/users/infra/typeorm/repositories/UserTokensRespository");

_tsyringe.container.registerSingleton('TodoRespository', _TodoRepository.TodoRepository);

_tsyringe.container.registerSingleton('UserRepository', _UserRepository.UserRepository);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRespository.UserTokensRepository);