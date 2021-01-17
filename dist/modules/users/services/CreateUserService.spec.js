"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/Fakes/FakeCacheProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUser;
let fakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'teste@teste.com.br',
      name: 'Michle de Freitas Ribeiro',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another.', async () => {
    await createUser.execute({
      email: 'teste@teste.com.br',
      name: 'Michle de Freitas Ribeiro',
      password: '123456'
    });
    await expect(createUser.execute({
      email: 'teste@teste.com.br',
      name: 'Michle de Freitas Ribeiro',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});