import { Router } from 'express'
<<<<<<< HEAD:src/routes/todo.routes.ts
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateTodoController } from '../modules/todos/usecases/createTodo/CreateTodoController'
import { DeleteTodoController } from '../modules/todos/usecases/deleteTodo/DeleteTodoController'
import { GetAllTodosController } from '../modules/todos/usecases/getAllTodos/GetAllTodosController'
import { GetAllTodosCompletedController } from '../modules/todos/usecases/getAllTodosCompleted/GetAllTodosCompletedController'
import { SetTodoCompletedController } from '../modules/todos/usecases/setTodoCompleted/SetTodoCompletedController'
=======
import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/todos/useCases/deleteTodo/DeleteTodoController'
import { GetAllTodosController } from '@modules/todos/useCases/getAllTodos/GetAllTodosController'
import { GetAllTodosCompletedController } from '@modules/todos/useCases/getAllTodosCompleted/GetAllTodosCompletedController'
import { SetTodoCompletedController } from '@modules/todos/useCases/setTodoCompleted/SetTodoCompletedController'
>>>>>>> main:src/shared/http/routes/todo.routes.ts

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
