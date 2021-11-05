import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'
import handlebars from 'handlebars'
import fs from 'fs'
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
  async sendMail(to: string, subject: string, varibles: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(varibles)

    await this.client.sendMail({
      to,
      from: 'Rian Negreiros <noreplay@todoapp.com.br>',
      subject,
      html: templateHTML,
    })
  }
}

export { EtherealMailProvider }
