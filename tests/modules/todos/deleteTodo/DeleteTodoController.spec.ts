import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { app } from '@shared/infra/http/app'
import { TodoRepository } from '@modules/todos/infra/typeorm/repositories/TodoRepository'

let userRepository: UserRepository
let todoRepository: TodoRepository
let connection: Connection
describe('Delete Todo Controller', () => {
  beforeEach(() => {
    userRepository = new UserRepository()
    todoRepository = new TodoRepository()
  })

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const userId = uuidV4()
    const password = await hash('deleteTODO123@', 8)
    await connection.query(
      `INSERT INTO USERS(id, username, email, password, created_at)
      values('${userId}', 'deleteTodo', 'deleteTodo@mail.com', '${password}', 'now()')`
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

  it('Should return 200 if todo deletion succeeds', async () => {
    const auth = await request(app).post('/authentication/sessions').send({
      email: 'deleteTodo@mail.com',
      password: 'deleteTODO123@',
    })
    const user = await userRepository.findUserByEmail('deleteTodo@mail.com')
    const todo = await todoRepository.findTodosByUser(user.id)

    const { token } = auth.body
    const response = await request(app)
      .delete('/todos/delete')
      .send({
        userId: user.id,
        todoId: todo[0].id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(response.status).toBe(200)
  })

  it('Should return 400 if todo deletion fails', async () => {
    const auth = await request(app).post('/authentication/sessions').send({
      email: 'deleteTodo@mail.com',
      password: 'deleteTODO123@',
    })
    const user = await userRepository.findUserByEmail('deleteTodo@mail.com')
    const todoId = uuidV4()

    const { token } = auth.body
    const response = await request(app)
      .delete('/todos/delete')
      .send({
        userId: user.id,
        todoId: todoId,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(response.status).toBe(400)
  })
})
