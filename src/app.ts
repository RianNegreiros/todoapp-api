import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/todoRoutes'
import userRoutes from './routes/userRoutes'
import { dbConnection } from './data/database/dbConnection'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(todoRoutes)

dbConnection()

export default app