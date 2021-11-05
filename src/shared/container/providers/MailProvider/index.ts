import { container } from 'tsyringe'
import { EtherealMailProvider } from './EtherealMailProvider'
import { IMailProvider } from './IMailProvider'

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider
)
