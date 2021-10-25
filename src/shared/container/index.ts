import { container } from 'tsyringe'
import { ITodoRepository } from '../../modules/todos/repositories/ITodoRepository'
import { IUserRepository } from '../../modules/users/repositories/IUserRepository'
import { TodoRepository } from '../../modules/todos/repositories/TodoRepository'
import { UserRepository } from '../../modules/users/repositories/UserRepository'

container.registerSingleton<ITodoRepository>(
  "TodoRespository",
  TodoRepository
)

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
)