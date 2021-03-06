import { injectable, inject } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'

import mailConfig from '@config/mail'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
class EtherealMailProvider implements IMailProvider {
	private client: Transporter

	constructor(
		@inject('MailTemplateProvider')
		private mailTemplateProvider: IMailTemplateProvider
	) {
		nodemailer.createTestAccount().then(account => {
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

	public async sendMail({ to, from, subject, templateData }: ISendMailDTO) {
		const { defaults } = mailConfig

		const message = await this.client.sendMail({
			from: {
				name: from?.name || defaults.from.name,
				address: from?.email || defaults.from.email,
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await this.mailTemplateProvider.parse(templateData),
		})

		console.log(nodemailer.getTestMessageUrl(message))
	}
}

export default EtherealMailProvider
