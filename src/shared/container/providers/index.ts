import { container } from 'tsyringe'
import { DateProvider } from './DateProvider/DateProvider'
import { IDateProvider } from './DateProvider/IDateProvider'

container.registerSingleton<IDateProvider>(
  'DateProvider',
  DateProvider
)
