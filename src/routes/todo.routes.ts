import { Router } from 'express'
import { CreateTodoController } from '../usecases/createTodo/CreateTodoController'
import { DeleteTodoController } from '../usecases/deleteTodo/DeleteTodoController'
import { GetAllTodosController } from '../usecases/getAllTodos/GetAllTodosController'
import { GetAllTodosCompletedController } from '../usecases/getAllTodosCompleted/GetAllTodosCompletedController'
import { SetTodoCompletedController } from '../usecases/setTodoCompleted/SetTodoCompletedController'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoCompletedController = new SetTodoCompletedController()
const getAllTodosCompletedController = new GetAllTodosCompletedController()
const getAllTodosController = new GetAllTodosController()

todoRoutes.post('/add', createTodoController.handle)

todoRoutes.delete('/delete', deleteTodoController.handle)

todoRoutes.put('/setcompleted', setTodoCompletedController.handle)

todoRoutes.get('/completeds', getAllTodosCompletedController.handle)

todoRoutes.get('/alltodos', getAllTodosController.handle)

export { todoRoutes }