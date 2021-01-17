"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProvidersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProvidersService {
  constructor(userRepository, cacheProvider) {
    this.userRepository = userRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    user_id
  }) {
    let users = await this.cacheProvider.recover(`providers-list:${user_id}`); // users = null;

    if (!users || users === null) {
      users = await this.userRepository.findAllProvider({
        except_user_id: user_id
      });

      if (!users) {
        throw new _AppError.default('Providers not existing');
      }

      await this.cacheProvider.save(`providers-list:${user_id}`, (0, _classTransformer.classToClass)(users));
    }

    return users;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListProvidersService;
exports.default = _default;