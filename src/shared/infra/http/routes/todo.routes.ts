import { Router } from 'express'
import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/todos/useCases/deleteTodo/DeleteTodoController'
import { SetTodoStatusController } from '@modules/todos/useCases/setTodoStatus/SetTodoStatusController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { GetUserTodosCompletedController } from '@modules/todos/useCases/getUserTodosCompleted/GetUserTodosCompletedController'
import { GetUserAllTodosController } from '@modules/todos/useCases/getUserAllTodos/GetUserAllTodosController'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoStatusController = new SetTodoStatusController()
const getUserTodosCompletedController = new GetUserTodosCompletedController()
const getAllTodosController = new GetUserAllTodosController()

todoRoutes.post('/create', ensureAuthenticated, createTodoController.handle)

todoRoutes.put('/status', setTodoStatusController.handle)

todoRoutes.delete('/delete', deleteTodoController.handle)

todoRoutes.get('/all', getAllTodosController.handle)

todoRoutes.get('/completeds', getUserTodosCompletedController.handle)

export { todoRoutes }
