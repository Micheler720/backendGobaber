"use strict";

require("reflect-metadata");

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _FakeUsersTokenRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersTokenRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeUserRepository;
let fakeMailProvider;
let fakeUserTokensRepotory;
let sendForgotPasswordEmail;
describe('ForgotEmailPassword', () => {
  beforeEach(() => {
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserRepository = new _FakeUserRepository.default();
    fakeUserTokensRepotory = new _FakeUsersTokenRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUserRepository, fakeMailProvider, fakeUserTokensRepotory);
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const user = await fakeUserRepository.create({
      email: 'micheler720@gmail.com',
      name: 'Michele',
      password: '1234560'
    });
    await sendForgotPasswordEmail.execute({
      email: user.email
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password.', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'micheler720@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate forgot password token.', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepotory, 'generate');
    await fakeUserRepository.create({
      email: 'micheler720@gmail.com',
      name: 'Michele',
      password: '1234560'
    });
    await sendForgotPasswordEmail.execute({
      email: 'micheler720@gmail.com'
    });
    expect(generateToken).toHaveBeenCalled();
  });
});