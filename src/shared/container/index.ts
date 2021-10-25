import { container } from 'tsyringe'
import { ITodoRepository } from '../../data/repositories/ITodoRepository'
import { TodoRepository } from '../../data/repositories/TodoRepository'

container.registerSingleton<ITodoRepository>(
  "TodoRespository",
  TodoRepository
)