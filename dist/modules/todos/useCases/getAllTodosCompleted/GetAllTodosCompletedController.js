"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetAllTodosCompletedController = void 0;

var _tsyringe = require("tsyringe");

var _GetAllTodosCompletedUseCase = require("./GetAllTodosCompletedUseCase");

class GetAllTodosCompletedController {
  async handle(request, response) {
    const {
      userId
    } = request.body;

    const getAllTodosCompletedUseCase = _tsyringe.container.resolve(_GetAllTodosCompletedUseCase.GetAllTodosCompletedUseCase);

    try {
      const todos = await getAllTodosCompletedUseCase.execute(userId);
      return response.status(200).json(todos);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

}

exports.GetAllTodosCompletedController = GetAllTodosCompletedController;