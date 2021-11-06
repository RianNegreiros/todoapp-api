import { Router } from 'express'
import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/todos/useCases/deleteTodo/DeleteTodoController'
import { SetTodoStatusController } from '@modules/todos/useCases/setTodoStatus/SetTodoStatusController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { GetUserCompleteTodosController } from '@modules/todos/useCases/getUserTodosCompleted/GetUserCompleteTodosController'
import { GetUserAllTodosController } from '@modules/todos/useCases/getUserAllTodos/GetUserAllTodosController'
import { ClearCompletedTodosController } from '@modules/todos/useCases/clearCompletedTodos/ClearCompletedTodosController'
import { GetAllUncompletedController } from '@modules/todos/useCases/getAllUncompletedTodos/GetAllUncompletedTodosController'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoStatusController = new SetTodoStatusController()
const getUserCompleteTodosController = new GetUserCompleteTodosController()
const getAllTodosController = new GetUserAllTodosController()
const getAllUncompletedController = new GetAllUncompletedController()
const clearCompletedsTodos = new ClearCompletedTodosController()

todoRoutes.post('/create', ensureAuthenticated, createTodoController.handle)

todoRoutes.put('/status', ensureAuthenticated, setTodoStatusController.handle)

todoRoutes.delete('/delete', ensureAuthenticated, deleteTodoController.handle)

todoRoutes.get('/all', ensureAuthenticated, getAllTodosController.handle)

todoRoutes.get(
  '/completed',
  ensureAuthenticated,
  getUserCompleteTodosController.handle
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
