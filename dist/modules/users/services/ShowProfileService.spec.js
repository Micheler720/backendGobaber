"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let userRepository;
let showProfile;
describe('ShowProfileUser', () => {
  beforeEach(() => {
    userRepository = new _FakeUserRepository.default();
    showProfile = new _ShowProfileService.default(userRepository);
  });
  it('shoul be able find this user', async () => {
    const findById = jest.spyOn(userRepository, 'findById');
    const user = await userRepository.create({
      email: 'teste@teste.com.br',
      name: 'MIchele de Freitas Ribeiro',
      password: '1234560'
    });
    const showUser = await showProfile.execute({
      user_id: user.id
    });
    expect(showUser).toHaveProperty('email');
    expect(findById).toHaveBeenCalledWith(user.id);
  });
  it('shoul be able not find this user already', async () => {
    await expect(showProfile.execute({
      user_id: 'no-existing-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});