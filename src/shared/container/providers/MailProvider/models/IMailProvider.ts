import ISendMailDto from '../dtos/ISendMailDto';

interface IMailProvider {
    sendMail({ subject, to, from, templateData }: ISendMailDto): Promise<void>;
}
export default IMailProvider;
