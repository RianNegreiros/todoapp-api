import { v4 as uuidV4 } from 'uuid'
import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { SetTodoStatusUseCase } from '@modules/todos/useCases/setTodoStatus/SetTodoStatusUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
let setTodoStatusUseCase: SetTodoStatusUseCase
describe('Create Todo Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )

    setTodoStatusUseCase = new SetTodoStatusUseCase(todoRepositoryInMemory)
  })

  it('Should be able to change todo status', async () => {
    const userData: IRegisterUserRequest = {
      username: 'setStatus',
      email: 'setStatus@mail.com',
      password: 'setSTATUS123@',
      confirmPassword: 'setSTATUS123@',
    }
    await createUserUseCase.execute(userData)
    const userCreated = await userRepositoryInMemory.findUserByEmail(
      userData.email
    )

    const createTodo = await createTodoUseCase.execute(
      userCreated.id,
      'new todo body'
    )
    await setTodoStatusUseCase.execute(createTodo.id, true)

    const todo = await todoRepositoryInMemory.findTodoById(createTodo.id)
    expect(todo.completed).toBeTruthy()
  })

  it('Should throws if todo is not found', async () => {
    expect(async () => {
      const userData: IRegisterUserRequest = {
        username: 'setStatus',
        email: 'setStatus@mail.com',
        password: 'setSTATUS123@',
        confirmPassword: 'setSTATUS123@',
      }
      await createUserUseCase.execute(userData)
      const userCreated = await userRepositoryInMemory.findUserByEmail(
        userData.email
      )

      await createTodoUseCase.execute(userCreated.id, 'new todo body')

      const todoId = uuidV4()
      await setTodoStatusUseCase.execute(todoId, true)
    }).rejects.toThrow(new Error('Todo not found by this id'))
  })
})
