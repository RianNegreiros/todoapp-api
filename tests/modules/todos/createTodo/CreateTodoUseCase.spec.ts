import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'

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
      username: 'createUser',
      email: 'createUser@mail.com',
      password: 'createUSER123@',
      confirmPassword: 'createUSER123@',
    }
    await createUserUseCase.execute(userData)
    const userCreated = await userRepositoryInMemory.findUserByEmail(
      userData.email
    )

    const todo = await todoRepositoryInMemory.createTodo(
      userCreated.id,
      'new todo body'
    )

    expect(todo).toHaveProperty('user_id')
  })
})
