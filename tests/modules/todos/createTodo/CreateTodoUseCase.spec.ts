import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/usecases/createTodo/CreateTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/usecases/createUser/CreateUserUseCase'
import { v4 as uuidV4 } from 'uuid'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
describe('Create Todo Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )
  })

  it('Should be able to create a new todo', async () => {
    const userData: IRegisterUserRequest = {
      username: 'createTodo',
      email: 'createTodo@mail.com',
      password: 'createTODO123@',
      confirmPassword: 'createTODO123@',
    }
    await createUserUseCase.execute(userData)
    const userCreated = await userRepositoryInMemory.findUserByEmail(
      userData.email
    )

    const todo = await createTodoUseCase.execute(
      userCreated.id,
      'new todo body'
    )

    expect(todo).toHaveProperty('user_id')
  })

  it('Should throws if user is not found', async () => {
    expect(async () => {
      await createTodoUseCase.execute(uuidV4(), 'new todo body')
    }).rejects.toThrow(new Error('User not found by this id'))
  })
})
