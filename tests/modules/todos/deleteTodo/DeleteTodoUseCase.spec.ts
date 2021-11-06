import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { DeleteTodoUseCase } from '@modules/todos/useCases/deleteTodo/DeleteTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { v4 as uuidV4 } from 'uuid'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
let deleTodoUseCase: DeleteTodoUseCase
describe('Delete Todo Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)

    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )
    deleTodoUseCase = new DeleteTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )
  })

  it('Should be able to delete a todo', async () => {
    const userData: IRegisterUserRequest = {
      username: 'deleteTodo',
      email: 'deleteTodo@mail.com',
      password: 'deleteTODO123@',
      confirmPassword: 'deleteTODO123@',
    }
    await createUserUseCase.execute(userData)
    const userCreated = await userRepositoryInMemory.findUserByEmail(
      userData.email
    )

    const todo = await createTodoUseCase.execute(
      userCreated.id,
      'new todo body'
    )
    await deleTodoUseCase.execute(userCreated.id, todo.id)

    const exists = await todoRepositoryInMemory.findTodoById(todo.id)

    expect(!!exists).toBeFalsy()
  })

  it('Should throws if user is not found', async () => {
    expect(async () => {
      const id = uuidV4()
      const todo = await createTodoUseCase.execute(id, 'new todo body')
      await deleTodoUseCase.execute(id, todo.id)
    }).rejects.toThrow(new Error('User not found by this id'))
  })

  it('Should throws if todo is not found', async () => {
    expect(async () => {
      const userData: IRegisterUserRequest = {
        username: 'deleteTodo',
        email: 'deleteTodo@mail.com',
        password: 'deleteTODO123@',
        confirmPassword: 'deleteTODO123@',
      }
      await createUserUseCase.execute(userData)
      const user = await userRepositoryInMemory.findUserByEmail(userData.email)
      
      await createTodoUseCase.execute(user.id, 'new todo body')

      const todoId = uuidV4()
      await deleTodoUseCase.execute(user.id, todoId)
    }).rejects.toThrow(new Error('Todo not found by this id'))
  })
})
