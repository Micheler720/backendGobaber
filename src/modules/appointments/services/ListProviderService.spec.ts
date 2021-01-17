import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/Fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let userRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersService', () => {
    beforeEach(() => {
        userRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviders = new ListProvidersService(
            userRepository,
            fakeCacheProvider,
        );
    });

    it('shoul be able to list the providers', async () => {
        const loggedUser = await userRepository.create({
            email: 'teste@teste.com.br',
            name: 'Michle de Freitas Ribeiro',
            password: '123456',
        });
        const user1 = await userRepository.create({
            email: 'teste2@teste.com.br',
            name: 'Michle de Freitas Ribeiro',
            password: '123456',
        });
        const user2 = await userRepository.create({
            email: 'teste3@teste.com.br',
            name: 'Michle de Freitas Ribeiro',
            password: '123456',
        });
        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });
        expect(providers).toEqual([user1, user2]);
    });
});
