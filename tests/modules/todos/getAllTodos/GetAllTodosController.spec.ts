import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { v4 as uuidV4 } from 'uuid'
import request from 'supertest'
import { TodoRepository } from '@modules/todos/infra/typeorm/repositories/TodoRepository'
import { Connection, createConnection } from 'typeorm'
import { hash } from 'bcrypt'
import { app } from '@shared/infra/http/app'

let userRepository: UserRepository
let todoRepository: TodoRepository
let connection: Connection
describe('Get All User Todos Controller', () => {
  beforeEach(() => {
    userRepository = new UserRepository()
    todoRepository = new TodoRepository()
  })

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const userId = uuidV4()
    const password = await hash('setTodoSTATUS123@', 8)
    await connection.query(
      `INSERT INTO USERS(id, username, email, password, created_at)
      values('${userId}', 'setTodoStatus', 'setTodoStatus@mail.com', '${password}', 'now()')`
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
      email: 'setTodoStatus@mail.com',
      password: 'setTodoSTATUS123@',
    })
    const user = await userRepository.findUserByEmail('setTodoStatus@mail.com')
    const { token } = auth.body
    const response = await request(app).get('/todos/all').send({
      userId: user.id
    })
    .set({
      Authorization: `Bearer ${token}`,
    })

    expect(response.status).toBe(200)
  })
})