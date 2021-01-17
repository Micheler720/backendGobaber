"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/Fakes/FakeCacheProvider"));

var _UpdateUsersAvatarService = _interopRequireDefault(require("./UpdateUsersAvatarService"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let createUser;
let fakeStorageProvider;
let updateAvatar;
let fakeHashProvider;
let fakeCacheProvider;
describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
    updateAvatar = new _UpdateUsersAvatarService.default(fakeUsersRepository, fakeStorageProvider);
  });
  it('should not be able to update avatar from non existing user', async () => {
    await expect(updateAvatar.execute({
      avatarFileName: 'adfad',
      user_id: 'jaijdas'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to avatar update.', async () => {
    const user = await createUser.execute({
      email: 'fulano@fulano.com.br',
      name: 'Fulano',
      password: '123456'
    });
    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'teste.jpg'
    });
    expect(user.avatar).toBe('teste.jpg');
  });
  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      email: 'fulano@fulano.com.br',
      name: 'Fulano',
      password: '123456'
    });
    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});