"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTodoController = void 0;

var _tsyringe = require("tsyringe");

var _CreateTodoUseCase = require("./CreateTodoUseCase");

class CreateTodoController {
  async handle(request, response) {
    const {
      userId,
      body
    } = request.body;

    const createTodoUseCase = _tsyringe.container.resolve(_CreateTodoUseCase.CreateTodoUseCase);

    try {
      const todo = await createTodoUseCase.execute({
        userId,
        body
      });
      return response.status(201).json(todo);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

}

exports.CreateTodoController = CreateTodoController;