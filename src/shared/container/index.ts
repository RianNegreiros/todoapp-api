import { container } from 'tsyringe'
import '@shared/container/providers'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'
import { TodoRepository } from '@modules/todos/infra/typeorm/repositories/TodoRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRespository'


container.registerSingleton<ITodoRepository>('TodoRepository', TodoRepository)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)
