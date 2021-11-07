import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'
import { SES } from 'aws-sdk'
import { IMailProvider } from './IMailProvider'
import 'dotenv/config'

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    })
  }

  async sendMail(
    to: string,
    subject: string,
    varibles: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(varibles)

    const message = await this.client.sendMail({
      to,
      from: 'Todo App <rian@riannegreiros.dev>',
      subject,
      html: templateHTML,
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export { SESMailProvider }
