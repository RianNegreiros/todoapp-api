import { app } from '../../../app'
import env from '@config/env'

import '@shared/container'

const server = app.listen(env.port, () =>
  console.log(`Server running at http://localhost:${env.port}`)
)

process.on('SIGINT', () => {
  server.close()
  console.log('Express server closed.')
})
