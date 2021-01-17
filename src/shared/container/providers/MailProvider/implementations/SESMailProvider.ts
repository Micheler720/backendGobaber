import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IModelTemplateProvider';
import ISendMailDto from '../dtos/ISendMailDto';
import IMailProvider from '../models/IMailProvider';

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
            }),
        });
    }

    public async sendMail({
        subject,
        to,
        from,
        templateData,
    }: ISendMailDto): Promise<void> {
        const { name, email } = mailConfig.defaults.from;
        await this.client.sendMail({
            from: {
                address: from?.email || email,
                name: from?.name || name,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
}
export default SESMailProvider;
