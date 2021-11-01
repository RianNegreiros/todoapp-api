import { Router } from 'express'
import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/todos/useCases/deleteTodo/DeleteTodoController'
import { GetAllTodosController } from '@modules/users/useCases/getAllTodos/GetAllTodosController'
import { GetAllTodosCompletedController } from '@modules/users/useCases/getAllTodosCompleted/GetAllTodosCompletedController'
import { SetTodoCompletedController } from '@modules/todos/useCases/setTodoCompleted/SetTodoCompletedController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoCompletedController = new SetTodoCompletedController()
const getAllTodosCompletedController = new GetAllTodosCompletedController()
const getAllTodosController = new GetAllTodosController()

todoRoutes.post('/add', ensureAuthenticated, createTodoController.handle)

todoRoutes.put('/setcompleted', setTodoCompletedController.handle)

todoRoutes.delete('/delete', deleteTodoController.handle)

todoRoutes.get('/alltodos', getAllTodosController.handle)

todoRoutes.get('/completeds', getAllTodosCompletedController.handle)

export { todoRoutes }
