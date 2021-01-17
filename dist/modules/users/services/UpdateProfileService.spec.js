"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUserRepository, fakeHashProvider);
  });
  it('should be able to update the profile.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Michele de Freitas Ribeiro',
      email: 'micheler720@gmail.com',
      password: '123456'
    });
    const updaatedUser = await updateProfile.execute({
      email: 'JhonnTres@teste.com.br',
      name: 'Jhonn',
      old_password: '123456',
      password: '14253789',
      user_id: user.id
    });
    expect(updaatedUser.email).toBe('JhonnTres@teste.com.br');
    expect(updaatedUser.name).toBe('Jhonn');
  });
  it('should not be able to change to another user email', async () => {
    const user = await fakeUserRepository.create({
      name: 'Michele de Freitas Ribeiro',
      email: 'micheler720@gmail.com',
      password: '123456'
    });
    await fakeUserRepository.create({
      name: 'Michele de Freitas Ribeiro',
      email: 'micheler@gmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      email: 'micheler@gmail.com',
      name: 'Jhonn',
      old_password: '123456',
      password: '14253789',
      user_id: user.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Michele de Freitas Ribeiro',
      email: 'micheler720@gmail.com',
      password: '123456'
    });
    const updaatedUser = await updateProfile.execute({
      email: 'JhonnTres@teste.com.br',
      name: 'Jhonn',
      old_password: '123456',
      password: '14253789',
      user_id: user.id
    });
    expect(updaatedUser.password).toBe('14253789');
  });
  it('should not be able to update the password, not already old password.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Michele de Freitas Ribeiro',
      email: 'micheler720@gmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      email: 'JhonnTres@teste.com.br',
      name: 'Jhonn',
      password: '14253789',
      user_id: user.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password, wrong old password.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Michele de Freitas Ribeiro',
      email: 'micheler720@gmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      email: 'JhonnTres@teste.com.br',
      name: 'Jhonn',
      old_password: '123',
      password: '14253789',
      user_id: user.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update profile if user not existing.', async () => {
    await expect(updateProfile.execute({
      email: 'JhonnTres@teste.com.br',
      name: 'Jhonn',
      old_password: '123',
      password: '14253789',
      user_id: 'no-existing'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});