import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { app } from '@shared/infra/http/app'

let userRepository: UserRepository
let connection: Connection
describe('Clear Completed Todos Controller', () => {
  beforeEach(() => {
    userRepository = new UserRepository()
  })

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const userId = uuidV4()
    const password = await hash('compleTED123@', 8)
    await connection.query(
      `INSERT INTO USERS(id, username, email, password, created_at)
      values('${userId}', 'completedTodos', 'completedTodos@mail.com', '${password}', 'now()')`
    )

    const todoId = uuidV4()
    await connection.query(
      `INSERT INTO TODOS(id, user_id, body, completed, created_at, updated_at)
      values('${todoId}', '${userId}', 'new todo body', 'true', 'now()', 'now()')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should return 200 if completed todos cleaning succeeds', async () => {
    const auth = await request(app).post('/authentication/sessions').send({
      email: 'completedTodos@mail.com',
      password: 'compleTED123@',
    })
    const user = await userRepository.findUserByEmail(
      'completedTodos@mail.com'
    )

    const { token } = auth.body
    const response = await request(app)
      .delete('/todos/clear-completed')
      .send({
        userId: user.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(response.status).toBe(200)
  })

  it('Should return 400 if completed todos cleaning fails', async () => {
    const auth = await request(app).post('/authentication/sessions').send({
      email: 'completedTodos@mail.com',
      password: 'compleTED123@',
    })

    const userId = uuidV4()
    const { token } = auth.body
    const response = await request(app)
      .delete('/todos/clear-completed')
      .send({
        userId,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(response.status).toBe(400)
  })
})
