import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            email: 'teste@teste.com.br',
            name: 'Michle de Freitas Ribeiro',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });
    it('should not be able to create a new user with same email from another.', async () => {
        await createUser.execute({
            email: 'teste@teste.com.br',
            name: 'Michle de Freitas Ribeiro',
            password: '123456',
        });

        await expect(
            createUser.execute({
                email: 'teste@teste.com.br',
                name: 'Michle de Freitas Ribeiro',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
