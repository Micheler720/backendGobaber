import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/Fakes/FakeCacheProvider';
import UpdateAvatarService from './UpdateUsersAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatar: UpdateAvatarService;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();

        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );

        updateAvatar = new UpdateAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });

    it('should not be able to update avatar from non existing user', async () => {
        await expect(
            updateAvatar.execute({
                avatarFileName: 'adfad',
                user_id: 'jaijdas',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to avatar update.', async () => {
        const user = await createUser.execute({
            email: 'fulano@fulano.com.br',
            name: 'Fulano',
            password: '123456',
        });

        await updateAvatar.execute({
            user_id: user.id,
            avatarFileName: 'teste.jpg',
        });
        expect(user.avatar).toBe('teste.jpg');
    });

    it('should delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            email: 'fulano@fulano.com.br',
            name: 'Fulano',
            password: '123456',
        });

        await updateAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });
        await updateAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg',
        });
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
