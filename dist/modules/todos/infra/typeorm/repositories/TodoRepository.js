"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoRepository = void 0;

var _typeorm = require("typeorm");

var _Todo = require("../entities/Todo");

class TodoRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Todo.Todo);
  }

  async createTodo(body, user) {
    this.repository.create({
      body,
      user
    });
  }

  async deleteTodo(id) {
    await this.repository.delete(id);
  }

  async setTodoStatus(id, status) {
    await this.repository.createQueryBuilder().update().set({
      isCompleted: status
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

  async getAllTodos(user) {
    return user.todos;
  }

  async getAllCompleted(user) {
    return user.todos.filter(t => t.isCompleted === true);
  }

}

exports.TodoRepository = TodoRepository;