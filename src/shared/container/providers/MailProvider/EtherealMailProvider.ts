import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'
import { IMailProvider } from './IMailProvider'

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter
  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })
      this.client = transporter
    })
  }
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Rian Negreiros <noreplay@todoapp.com.br>',
      subject,
      text: body,
      html: body,
    })
  }
}

export { EtherealMailProvider }
