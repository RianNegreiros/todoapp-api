"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAllTodosController = void 0;

var _tsyringe = require("tsyringe");

var _GetAllTodosUseCase = require("./GetAllTodosUseCase");

class GetAllTodosController {
  async handle(request, response) {
    const {
      userId
    } = request.body;

    const getAllTodosUseCase = _tsyringe.container.resolve(_GetAllTodosUseCase.GetAllTodosUseCase);

    try {
      const todos = await getAllTodosUseCase.execute(userId);
      return response.status(200).json(todos);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

}

exports.GetAllTodosController = GetAllTodosController;