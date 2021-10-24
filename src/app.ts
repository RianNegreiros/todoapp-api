import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/todo.routes'
import userRoutes from './routes/user.routes'
import { dbConnection } from './data/database/dbConnection'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(todoRoutes)

dbConnection()

export default app