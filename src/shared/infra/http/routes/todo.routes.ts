import { Router } from 'express'
import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/todos/useCases/deleteTodo/DeleteTodoController'
import { SetTodoStatusController } from '@modules/todos/useCases/setTodoStatus/SetTodoStatusController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { GetCompleteTodosController } from '@modules/todos/useCases/getTodosCompleted/GetCompleteTodosController'
import { GetAllTodosController } from '@modules/todos/useCases/getAllTodos/GetUserAllTodosController'
import { ClearCompletedTodosController } from '@modules/todos/useCases/clearCompletedTodos/ClearCompletedTodosController'
import { GetAllUncompletedController } from '@modules/todos/useCases/getAllUncompletedTodos/GetAllUncompletedTodosController'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoStatusController = new SetTodoStatusController()
const getCompleteTodosController = new GetCompleteTodosController()
const getAllTodosController = new GetAllTodosController()
const getAllUncompletedController = new GetAllUncompletedController()
const clearCompletedsTodos = new ClearCompletedTodosController()

todoRoutes.post('/create', ensureAuthenticated, createTodoController.handle)

todoRoutes.put('/status', ensureAuthenticated, setTodoStatusController.handle)

todoRoutes.delete('/delete', ensureAuthenticated, deleteTodoController.handle)

todoRoutes.get('/all', ensureAuthenticated, getAllTodosController.handle)

todoRoutes.get(
  '/completed',
  ensureAuthenticated,
  getCompleteTodosController.handle
)

todoRoutes.get(
  '/uncompleted',
  ensureAuthenticated,
  getAllUncompletedController.handle
)

todoRoutes.delete(
  '/clear-completed',
  ensureAuthenticated,
  clearCompletedsTodos.handle
)

export { todoRoutes }
