import 'dotenv/config'
import { container } from 'tsyringe'
import { EtherealMailProvider } from './EtherealMailProvider'
import { IMailProvider } from './IMailProvider'
import { SESMailProvider } from './SESMailProvider'

const mailProvider : { [key: string]: any } = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER]
)