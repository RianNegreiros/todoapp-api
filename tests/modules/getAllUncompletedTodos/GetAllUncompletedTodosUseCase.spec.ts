import { v4 as uuidV4 } from 'uuid'
import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { GetAllUncompletedTodosUseCase } from '@modules/todos/useCases/getAllUncompletedTodos/GetAllUncompletedTodosUseCase'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
let getAllUncompletedTodosUseCase: GetAllUncompletedTodosUseCase
describe('Get User Uncompleted Todos Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )

    getAllUncompletedTodosUseCase = new GetAllUncompletedTodosUseCase(
      userRepositoryInMemory,
      todoRepositoryInMemory
    )
  })

  it('Should be able to return a list of user uncompleted todos', async () => {
    const userData: IRegisterUserRequest = {
      username: 'uncompletedTodos',
      email: 'uncompletedTodos@mail.com',
      password: 'uncompleTED123@',
      confirmPassword: 'uncompleTED123@',
    }
    await createUserUseCase.execute(userData)
    const user = await userRepositoryInMemory.findUserByEmail(userData.email)

    await createTodoUseCase.execute(user.id, 'new todo body')

    const uncompletedTodos = await getAllUncompletedTodosUseCase.execute(user.id)
    expect(uncompletedTodos.length).toBeGreaterThan(0)
  })

  it('Should throws if user is not found', async () => {
    expect(async () => {
      const userId = uuidV4()
      await createTodoUseCase.execute(userId, 'new todo body')
      await getAllUncompletedTodosUseCase.execute(userId)
    }).rejects.toThrow(new Error('User not found by this id'))
  })
})
