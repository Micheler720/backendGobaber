"use strict";

var _FakeUserRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUserRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/Fakes/FakeCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let userRepository;
let listProviders;
let fakeCacheProvider;
describe('ListProvidersService', () => {
  beforeEach(() => {
    userRepository = new _FakeUserRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(userRepository, fakeCacheProvider);
  });
  it('shoul be able to list the providers', async () => {
    const loggedUser = await userRepository.create({
      email: 'teste@teste.com.br',
      name: 'Michle de Freitas Ribeiro',
      password: '123456'
    });
    const user1 = await userRepository.create({
      email: 'teste2@teste.com.br',
      name: 'Michle de Freitas Ribeiro',
      password: '123456'
    });
    const user2 = await userRepository.create({
      email: 'teste3@teste.com.br',
      name: 'Michle de Freitas Ribeiro',
      password: '123456'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});