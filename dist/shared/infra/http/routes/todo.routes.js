"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoRoutes = void 0;

var _express = require("express");

var _CreateTodoController = require("../../../../modules/todos/useCases/createTodo/CreateTodoController");

var _DeleteTodoController = require("../../../../modules/todos/useCases/deleteTodo/DeleteTodoController");

var _GetAllTodosController = require("../../../../modules/todos/useCases/getAllTodos/GetAllTodosController");

var _GetAllTodosCompletedController = require("../../../../modules/todos/useCases/getAllTodosCompleted/GetAllTodosCompletedController");

var _SetTodoCompletedController = require("../../../../modules/todos/useCases/setTodoCompleted/SetTodoCompletedController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const todoRoutes = (0, _express.Router)();
exports.todoRoutes = todoRoutes;
const createTodoController = new _CreateTodoController.CreateTodoController();
const deleteTodoController = new _DeleteTodoController.DeleteTodoController();
const setTodoCompletedController = new _SetTodoCompletedController.SetTodoCompletedController();
const getAllTodosCompletedController = new _GetAllTodosCompletedController.GetAllTodosCompletedController();
const getAllTodosController = new _GetAllTodosController.GetAllTodosController();
todoRoutes.post('/add', _ensureAuthenticated.ensureAuthenticated, createTodoController.handle);
todoRoutes.delete('/delete', deleteTodoController.handle);
todoRoutes.put('/setcompleted', setTodoCompletedController.handle);
todoRoutes.get('/completeds', getAllTodosCompletedController.handle);
todoRoutes.get('/alltodos', getAllTodosController.handle);