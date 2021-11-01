import { Router } from 'express'
import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/todos/useCases/deleteTodo/DeleteTodoController'
import { SetTodoCompletedController } from '@modules/todos/useCases/setTodoCompleted/SetTodoCompletedController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoCompletedController = new SetTodoCompletedController()


todoRoutes.post('/add', ensureAuthenticated, createTodoController.handle)

todoRoutes.put('/setcompleted', setTodoCompletedController.handle)

todoRoutes.delete('/delete', deleteTodoController.handle)

export { todoRoutes }
