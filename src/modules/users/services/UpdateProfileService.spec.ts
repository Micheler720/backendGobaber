import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });
    it('should be able to update the profile.', async () => {
        const user = await fakeUserRepository.create({
            name: 'Michele de Freitas Ribeiro',
            email: 'micheler720@gmail.com',
            password: '123456',
        });
        const updaatedUser = await updateProfile.execute({
            email: 'JhonnTres@teste.com.br',
            name: 'Jhonn',
            old_password: '123456',
            password: '14253789',
            user_id: user.id,
        });
        expect(updaatedUser.email).toBe('JhonnTres@teste.com.br');
        expect(updaatedUser.name).toBe('Jhonn');
    });

    it('should not be able to change to another user email', async () => {
        const user = await fakeUserRepository.create({
            name: 'Michele de Freitas Ribeiro',
            email: 'micheler720@gmail.com',
            password: '123456',
        });
        await fakeUserRepository.create({
            name: 'Michele de Freitas Ribeiro',
            email: 'micheler@gmail.com',
            password: '123456',
        });
        await expect(
            updateProfile.execute({
                email: 'micheler@gmail.com',
                name: 'Jhonn',
                old_password: '123456',
                password: '14253789',
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password.', async () => {
        const user = await fakeUserRepository.create({
            name: 'Michele de Freitas Ribeiro',
            email: 'micheler720@gmail.com',
            password: '123456',
        });
        const updaatedUser = await updateProfile.execute({
            email: 'JhonnTres@teste.com.br',
            name: 'Jhonn',
            old_password: '123456',
            password: '14253789',
            user_id: user.id,
        });
        expect(updaatedUser.password).toBe('14253789');
    });

    it('should not be able to update the password, not already old password.', async () => {
        const user = await fakeUserRepository.create({
            name: 'Michele de Freitas Ribeiro',
            email: 'micheler720@gmail.com',
            password: '123456',
        });
        await expect(
            updateProfile.execute({
                email: 'JhonnTres@teste.com.br',
                name: 'Jhonn',
                password: '14253789',
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password, wrong old password.', async () => {
        const user = await fakeUserRepository.create({
            name: 'Michele de Freitas Ribeiro',
            email: 'micheler720@gmail.com',
            password: '123456',
        });
        await expect(
            updateProfile.execute({
                email: 'JhonnTres@teste.com.br',
                name: 'Jhonn',
                old_password: '123',
                password: '14253789',
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update profile if user not existing.', async () => {
        await expect(
            updateProfile.execute({
                email: 'JhonnTres@teste.com.br',
                name: 'Jhonn',
                old_password: '123',
                password: '14253789',
                user_id: 'no-existing',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
