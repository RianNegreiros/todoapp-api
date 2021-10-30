"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const {
      username,
      email,
      password,
      confirmPassword
    } = request.body;

    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    try {
      const user = await createUserUseCase.execute({
        username,
        email,
        password,
        confirmPassword
      });
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

}

exports.CreateUserController = CreateUserController;