import { Router } from 'express'
import { CreateTodoController } from '@modules/todos/useCases/createTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/todos/useCases/deleteTodo/DeleteTodoController'
import { SetTodoStatusController } from '@modules/todos/useCases/setTodoStatus/SetTodoStatusController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const deleteTodoController = new DeleteTodoController()
const setTodoStatusController = new SetTodoStatusController()


todoRoutes.post('/add', ensureAuthenticated, createTodoController.handle)

todoRoutes.put('/setcompleted', setTodoStatusController.handle)

todoRoutes.delete('/delete', deleteTodoController.handle)

export { todoRoutes }
