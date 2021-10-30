"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAllTodosCompletedUseCase = void 0;

var _tsyringe = require("tsyringe");

var _ITodoRepository = require("../../repositories/ITodoRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let GetAllTodosCompletedUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('TodoRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ITodoRepository.ITodoRepository === "undefined" ? Object : _ITodoRepository.ITodoRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class GetAllTodosCompletedUseCase {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute({
    userId
  }) {
    return await this.todoRepository.getAllCompleted(userId);
  }

}) || _class) || _class) || _class) || _class);
exports.GetAllTodosCompletedUseCase = GetAllTodosCompletedUseCase;