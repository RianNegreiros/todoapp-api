"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteTodoController = void 0;

var _tsyringe = require("tsyringe");

var _DeleteTodoUseCase = require("./DeleteTodoUseCase");

class DeleteTodoController {
  async handle(request, response) {
    const {
      userId,
      todoId
    } = request.body;

    const deleteTodoUseCase = _tsyringe.container.resolve(_DeleteTodoUseCase.DeleteTodoUseCase);

    try {
      await deleteTodoUseCase.execute({
        userId,
        todoId
      });
      return response.status(200);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

}

exports.DeleteTodoController = DeleteTodoController;