"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoRepositoryInMemory = void 0;

var _Todo = require("../../infra/typeorm/entities/Todo");

class TodoRepositoryInMemory {
  constructor() {
    this.todos = [];
  }

  async createTodo(body, user) {
    const todo = new _Todo.Todo();
    Object.assign(todo, {
      body,
      user
    });
    this.todos.push(todo);
  }

  async deleteTodo(id) {
    const todo = this.todos.filter(t => t.id === id);
    this.todos.splice(this.todos.indexOf(todo[0]));
  }

  async setTodoStatus(id, status) {
    const todo = this.todos.filter(t => t.id === id);
    todo[0].isCompleted = status;
  }

  async getAllTodos(user) {
    return user.todos;
  }

  async getAllCompleted(user) {
    return user.todos.filter(t => t.isCompleted === true);
  }

}

exports.TodoRepositoryInMemory = TodoRepositoryInMemory;