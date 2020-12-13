import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';
import ResetPassword from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokensRepository: FakeUsersTokensRepository;
let resetPassword: ResetPassword;

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUsersTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPassword = new ResetPassword(
            fakeUserRepository,
            fakeUserTokensRepository,
            fakeHashProvider,
        );
    });
    it('should be able to reset password', async () => {
        const generatHash = jest.spyOn(fakeHashProvider, 'generatHash');

        const user = await fakeUserRepository.create({
            email: 'micheler720@gmail.com',
            name: 'Michele',
            password: '1234560',
        });
        const { token } = await fakeUserTokensRepository.generate(user.id);

        await resetPassword.execute({
            token,
            password: '1234',
        });
        const updateUser = await fakeUserRepository.findById(user.id);
        const newHashPassword = await fakeHashProvider.generatHash('1234');

        expect(updateUser?.password).toBe(newHashPassword);
        expect(generatHash).toHaveBeenCalledWith('1234');
    });

    it('should not be able to reset the password with non-existing token.', async () => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to reset the password with non-existing user.', async () => {
        const { token } = await fakeUserTokensRepository.generate(
            'non-existent-use',
        );
        await expect(
            resetPassword.execute({
                token,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password if passed more than 2 hours.', async () => {
        const user = await fakeUserRepository.create({
            email: 'micheler720@gmail.com',
            name: 'Michele',
            password: '1234560',
        });
        const { token } = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                token,
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
