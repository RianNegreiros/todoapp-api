import env from "@config/env"
import { app } from "./app"

const server = app.listen(env.port, () =>
  console.log(`Server running at http://localhost:${env.port}`)
)

process.on('SIGINT', () => {
  server.close()
  console.log('Express server closed.')
})