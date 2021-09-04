import express from 'express'
import { dbConnection } from './config/dbConnection'
import env from './config/env'
import routes from './routes'

const app = express()

app.use(express.json())

dbConnection()

app.use(routes)
const server = app.listen(env.port, () =>
console.log(`Server running at http://localhost:${env.port}`))

process.on('SIGINT', () => {
  server.close()
  console.log('Express server closed.')
})