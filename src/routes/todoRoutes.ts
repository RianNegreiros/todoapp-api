import { Router } from 'express'
import { createTodoFactory } from '../factories/createTodoFactory'

const todoRoutes = Router()

todoRoutes.post('/todos/add', createTodoFactory().createTodo)
todoRoutes.delete('/todos/delete', createTodoFactory().deleteTodo)
todoRoutes.put('/todos/setcompleted', createTodoFactory().setToCompleted)
todoRoutes.get('/todos/completeds', createTodoFactory().getAll)
todoRoutes.get('/todos/completeds', createTodoFactory().getAllCompleted)

export default todoRoutes