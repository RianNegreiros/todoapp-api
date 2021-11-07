import { Router } from 'express'
import { CreateTodoController } from '@modules/todos/usecases/createTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/todos/usecases/deleteTodo/DeleteTodoController'
import { SetTodoStatusController } from '@modules/todos/usecases/setTodoStatus/SetTodoStatusController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { GetCompleteTodosController } from '@modules/todos/usecases/getTodosCompleted/GetCompleteTodosController'
import { GetAllTodosController } from '@modules/todos/usecases/getAllTodos/GetUserAllTodosController'
import { ClearCompletedTodosController } from '@modules/todos/usecases/clearCompletedTodos/ClearCompletedTodosController'
import { GetAllUncompletedController } from '@modules/todos/usecases/getAllUncompletedTodos/GetAllUncompletedTodosController'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoStatusController = new SetTodoStatusController()
const getCompleteTodosController = new GetCompleteTodosController()
const getAllTodosController = new GetAllTodosController()
const getAllUncompletedController = new GetAllUncompletedController()
const clearCompletedsTodos = new ClearCompletedTodosController()

todoRoutes.post('/', ensureAuthenticated, createTodoController.handle)

todoRoutes.put('/status', ensureAuthenticated, setTodoStatusController.handle)

todoRoutes.delete('/', ensureAuthenticated, deleteTodoController.handle)

todoRoutes.get('/', getAllTodosController.handle)

todoRoutes.get(
  '/completeds',
  getCompleteTodosController.handle
)

todoRoutes.get(
  '/uncompleted',
  getAllUncompletedController.handle
)

todoRoutes.delete(
  '/completeds',
  ensureAuthenticated,
  clearCompletedsTodos.handle
)

export { todoRoutes }
