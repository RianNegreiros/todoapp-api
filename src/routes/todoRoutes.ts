import { Router } from 'express'
import { addTodo, deleteTodo, getAllCompleted, setToCompleted } from '../controllers/todoController'

const todoRoutes = Router()

todoRoutes.post('/todos/add', addTodo)
todoRoutes.delete('/todos/delete', deleteTodo)
todoRoutes.put('/todos/completed', setToCompleted)
todoRoutes.get('/todos/completeds', getAllCompleted)

export default todoRoutes