import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private userTokensRepository: IUserTokenRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('User does not exist.');
        }
        const { token } = await this.userTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        await this.mailProvider.sendMail({
            subject: 'Recuperação de senha - GoBaber.',
            to: {
                email: user.email,
                name: user.name,
            },
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    token,
                    link: `http://localhost:3000/password/reset/${token}`,
                },
            },
        });
    }
}
export default SendForgotPasswordEmailService;
