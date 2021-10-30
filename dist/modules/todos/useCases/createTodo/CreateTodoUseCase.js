"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTodoUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ITodoRepository = require("../../repositories/ITodoRepository");

var _IUserRepository = require("../../../users/repositories/IUserRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateTodoUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TodoRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ITodoRepository.ITodoRepository === "undefined" ? Object : _ITodoRepository.ITodoRepository, typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateTodoUseCase {
  constructor(todoRepository, userRepository) {
    this.todoRepository = todoRepository;
    this.userRepository = userRepository;
  }

  async execute({
    userId,
    body
  }) {
    const user = await this.userRepository.findUserById(userId);

    if (!userId) {
      throw new Error('User not found by this id');
    }

    return await this.todoRepository.createTodo(body, user);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateTodoUseCase = CreateTodoUseCase;