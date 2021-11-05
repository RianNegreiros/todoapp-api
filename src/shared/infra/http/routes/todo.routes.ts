import { Router } from 'express'
import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/todos/useCases/deleteTodo/DeleteTodoController'
import { SetTodoStatusController } from '@modules/todos/useCases/setTodoStatus/SetTodoStatusController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { GetUserCompleteTodosController } from '@modules/todos/useCases/getUserTodosCompleted/GetUserCompleteTodosController'
import { GetUserAllTodosController } from '@modules/todos/useCases/getUserAllTodos/GetUserAllTodosController'
import { ClearCompletedTodosController } from '@modules/todos/useCases/clearCompletedTodos/ClearCompletedTodosController'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoStatusController = new SetTodoStatusController()
const getUserCompleteTodosController = new GetUserCompleteTodosController()
const getAllTodosController = new GetUserAllTodosController()
const clearCompletedsTodos = new ClearCompletedTodosController()

todoRoutes.post('/create', ensureAuthenticated, createTodoController.handle)

todoRoutes.put('/status', ensureAuthenticated, setTodoStatusController.handle)

todoRoutes.delete('/delete', ensureAuthenticated, deleteTodoController.handle)

todoRoutes.delete(
  '/clear-completeds',
  ensureAuthenticated,
  clearCompletedsTodos.handle
)

todoRoutes.get('/all', ensureAuthenticated, getAllTodosController.handle)

todoRoutes.get(
  '/completeds',
  ensureAuthenticated,
  getUserCompleteTodosController.handle
)

export { todoRoutes }
