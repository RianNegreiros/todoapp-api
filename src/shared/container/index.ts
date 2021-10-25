import { container } from 'tsyringe'
import { ITodoRepository } from '../../data/repositories/ITodoRepository'
import { IUserRepository } from '../../data/repositories/IUserRepository'
import { TodoRepository } from '../../data/repositories/TodoRepository'
import { UserRepository } from '../../data/repositories/UserRepository'

container.registerSingleton<ITodoRepository>(
  "TodoRespository",
  TodoRepository
)

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
)