import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  const connection = await createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? 'todoapp_test'
          : defaultOptions.database,
    })
  )
  console.log(`Database connect: ${connection.options.database}`)
  process.on('SIGINT', () => {
    connection.close().then(() => console.log('Database connection closed.'))
  })
  return connection
}
