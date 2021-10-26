import { container } from 'tsyringe'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'
import { TodoRepository } from '@modules/todos/repositories/TodoRepository'
import { IUserRepository } from '@modules/users/infra/typeorm/repositories/IUserRepository'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'


container.registerSingleton<ITodoRepository>('TodoRespository', TodoRepository)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
