import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateTodoController } from '../modules/todos/usecases/createTodo/CreateTodoController'
import { DeleteTodoController } from '../modules/todos/usecases/deleteTodo/DeleteTodoController'
import { GetAllTodosController } from '../modules/todos/usecases/getAllTodos/GetAllTodosController'
import { GetAllTodosCompletedController } from '../modules/todos/usecases/getAllTodosCompleted/GetAllTodosCompletedController'
import { SetTodoCompletedController } from '../modules/todos/usecases/setTodoCompleted/SetTodoCompletedController'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoCompletedController = new SetTodoCompletedController()
const getAllTodosCompletedController = new GetAllTodosCompletedController()
const getAllTodosController = new GetAllTodosController()

todoRoutes.use(ensureAuthenticated)
todoRoutes.post('/add', createTodoController.handle)

todoRoutes.delete('/delete', deleteTodoController.handle)

todoRoutes.put('/setcompleted', setTodoCompletedController.handle)

todoRoutes.get('/completeds', getAllTodosCompletedController.handle)

todoRoutes.get('/alltodos', getAllTodosController.handle)

export { todoRoutes }