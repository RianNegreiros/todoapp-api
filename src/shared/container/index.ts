import { container } from 'tsyringe'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRespository'
import { TodoRepository } from '@modules/todos/infra/typeorm/repositories/TodoRepository'


container.registerSingleton<ITodoRepository>('TodoRespository', TodoRepository)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)
