import { createConnection } from "typeorm"

export const dbConnection = async () => {

  try {
    const connection = await createConnection();

    console.log(`Database connect: ${connection.options.database}`)

    process.on('SIGINT', () => {
      connection.close().then(() => console.log('Database connection closed.'))
    })
  } catch (e) {
    console.log(e)
  }

}