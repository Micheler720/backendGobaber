"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _FakeUsersTokenRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersTokenRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUserRepository;
let fakeHashProvider;
let fakeUserTokensRepository;
let resetPassword;
describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new _FakeUserRepository.default();
    fakeUserTokensRepository = new _FakeUsersTokenRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUserRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset password', async () => {
    const generatHash = jest.spyOn(fakeHashProvider, 'generatHash');
    const user = await fakeUserRepository.create({
      email: 'micheler720@gmail.com',
      name: 'Michele',
      password: '1234560'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    await resetPassword.execute({
      token,
      password: '1234'
    });
    const updateUser = await fakeUserRepository.findById(user.id);
    const newHashPassword = await fakeHashProvider.generatHash('1234');
    expect(updateUser?.password).toBe(newHashPassword);
    expect(generatHash).toHaveBeenCalledWith('1234');
  });
  it('should not be able to reset the password with non-existing token.', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password with non-existing user.', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existent-use');
    await expect(resetPassword.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password if passed more than 2 hours.', async () => {
    const user = await fakeUserRepository.create({
      email: 'micheler720@gmail.com',
      name: 'Michele',
      password: '1234560'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      token,
      password: '1234'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});