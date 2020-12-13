import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepotory: FakeUsersTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('ForgotEmailPassword', () => {
    beforeEach(() => {
        fakeMailProvider = new FakeMailProvider();
        fakeUserRepository = new FakeUsersRepository();
        fakeUserTokensRepotory = new FakeUsersTokensRepository();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakeMailProvider,
            fakeUserTokensRepotory,
        );
    });
    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const user = await fakeUserRepository.create({
            email: 'micheler720@gmail.com',
            name: 'Michele',
            password: '1234560',
        });

        await sendForgotPasswordEmail.execute({
            email: user.email,
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password.', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'micheler720@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should generate forgot password token.', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepotory, 'generate');
        await fakeUserRepository.create({
            email: 'micheler720@gmail.com',
            name: 'Michele',
            password: '1234560',
        });

        await sendForgotPasswordEmail.execute({
            email: 'micheler720@gmail.com',
        });

        expect(generateToken).toHaveBeenCalled();
    });
});
