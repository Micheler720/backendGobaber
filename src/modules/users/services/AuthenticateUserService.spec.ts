import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/Fakes/FakeCacheProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createAuthenticate: AuthenticateUserService;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AutheticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createAuthenticate = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to autheticate', async () => {
        const user = await createUser.execute({
            email: 'teste@teste.com.br',
            name: 'Michle de Freitas Ribeiro',
            password: '123456',
        });

        const response = await createAuthenticate.execute({
            email: 'teste@teste.com.br',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to autheticate with non existing user.', async () => {
        await expect(
            createAuthenticate.execute({
                email: 'teste@teste.com.br',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to autheticate  wrong password.', async () => {
        await createUser.execute({
            email: 'teste@teste.com.br',
            name: 'Michle de Freitas Ribeiro',
            password: '123456',
        });

        await expect(
            createAuthenticate.execute({
                email: 'teste@teste.com.br',
                password: 'amkddvsnasjandj',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
