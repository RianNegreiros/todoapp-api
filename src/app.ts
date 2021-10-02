import express from 'express'
import cors from 'cors'
import { dbConnection } from './config/dbConnection'
import routes from './routes/userRoutes'

export const app = express()

app.use(cors())
app.use(express.json())

dbConnection()

routes