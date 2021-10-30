"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetTodoCompletedController = void 0;

var _tsyringe = require("tsyringe");

var _SetTodoCompletedUseCase = require("./SetTodoCompletedUseCase");

class SetTodoCompletedController {
  async handle(request, response) {
    const {
      userId,
      todoId
    } = request.body;

    const setTodoCompletedUseCase = _tsyringe.container.resolve(_SetTodoCompletedUseCase.SetTodoCompletedUseCase);

    try {
      const todo = await setTodoCompletedUseCase.execute({
        userId,
        todoId
      });
      return response.status(200).json(todo);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

}

exports.SetTodoCompletedController = SetTodoCompletedController;