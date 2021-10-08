import app from './app'
import env from './config/env'

const server = app.listen(env.port, () =>
console.log(`Server running at http://localhost:${env.port}`))

process.on('SIGINT', () => {
  server.close()
  console.log('Express server closed.')
})