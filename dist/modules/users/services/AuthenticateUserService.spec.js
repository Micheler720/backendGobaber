"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/Fakes/FakeCacheProvider"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createAuthenticate;
let createUser;
let fakeCacheProvider;
describe('AutheticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAuthenticate = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to autheticate', async () => {
    const user = await createUser.execute({
      email: 'teste@teste.com.br',
      name: 'Michle de Freitas Ribeiro',
      password: '123456'
    });
    const response = await createAuthenticate.execute({
      email: 'teste@teste.com.br',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to autheticate with non existing user.', async () => {
    await expect(createAuthenticate.execute({
      email: 'teste@teste.com.br',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to autheticate  wrong password.', async () => {
    await createUser.execute({
      email: 'teste@teste.com.br',
      name: 'Michle de Freitas Ribeiro',
      password: '123456'
    });
    await expect(createAuthenticate.execute({
      email: 'teste@teste.com.br',
      password: 'amkddvsnasjandj'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});