import ISendMailDto from '../dtos/ISendMailDto';
import IMailProvider from '../models/IMailProvider';

class FakeMailProvider implements IMailProvider {
    private message: ISendMailDto[] = [];

    async sendMail(message: ISendMailDto): Promise<void> {
        this.message.push(message);
    }
}

export default FakeMailProvider;
