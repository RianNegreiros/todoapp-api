import { Connection, createConnection } from 'typeorm'
import request from 'supertest'
import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcrypt'
import { app } from '@shared/infra/http/app'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'

let userRepository: UserRepository
let connection: Connection
describe('Authenticate User Controller', () => {
  beforeEach(() => {
    userRepository = new UserRepository()
  })

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('createTODO123@', 8)
    await connection.query(
      `INSERT INTO USERS(id, username, email, password, created_at)
      values('${id}', 'createTodo', 'createTodo@mail.com', '${password}', 'now()')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should return 201 if todo creation succeeds', async () => {
    const auth = await request(app).post('/authentication/sessions').send({
      email: 'createTodo@mail.com',
      password: 'createTODO123@',
    })
    const findUser = await userRepository.findUserByEmail(
      'createTodo@mail.com'
    )

    const { token } = auth.body
    const response = await request(app)
      .post('/todos/create')
      .send({
        userId: findUser.id,
        body: 'new todo body',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(response.status).toBe(201)
  })

  it('Should return 400 if user was not found', async () => {
    const auth = await request(app).post('/authentication/sessions').send({
      email: 'createTodo@mail.com',
      password: 'createTODO123@',
    })

    const id = uuidV4()
    const { token } = auth.body
    const response = await request(app)
      .post('/todos/create')
      .send({
        userId: id,
        body: 'new todo body',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(response.status).toBe(400)
  })
})
