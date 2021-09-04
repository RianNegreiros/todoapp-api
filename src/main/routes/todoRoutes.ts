import { Router } from 'express'
import { addTodo, deleteTodo, getAllCompleted, setToCompleted } from '../../presentation/controllers/todoController'

const routes = Router()

routes.post('/todos/add', addTodo)
routes.delete('/todos/delete', deleteTodo)
routes.put('/todos/completed', setToCompleted)

routes.get('/todos/completed', getAllCompleted)
routes.get('/todos/completed', getAllCompleted)

export default routes