import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcrypt'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { app } from '@shared/infra/http/app'

let userRepository: UserRepository
let connection: Connection
describe('Get User Complete Todos Controller', () => {
  beforeEach(() => {
    userRepository = new UserRepository()
  })

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const userId = uuidV4()
    const password = await hash('compleTEDS123@', 8)
    await connection.query(
      `INSERT INTO USERS(id, username, email, password, created_at)
      values('${userId}', 'getCompleteds', 'getCompleteds@mail.com', '${password}', 'now()')`
    )

    const todoId = uuidV4()
    await connection.query(
      `INSERT INTO TODOS(id, user_id, body, completed, created_at, updated_at)
      values('${todoId}', '${userId}', 'new todo body', 'false', 'now()', 'now()')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should return 200 if user todos listing succeeds', async () => {
    const auth = await request(app).post('/authentication/sessions').send({
      email: 'getCompleteds@mail.com',
      password: 'compleTEDS123@',
    })
    const user = await userRepository.findUserByEmail('getCompleteds@mail.com')
    const { token } = auth.body
    const response = await request(app)
      .get('/todos/completeds')
      .send({
        userId: user.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(response.status).toBe(200)
  })
})
