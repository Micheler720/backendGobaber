"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async save(user) {
    const findIndex = this.users.findIndex(userFind => user.id === userFind.id);
    this.users[findIndex] = user;
    return user;
  }

  async create(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuid.v4)()
    }, userData);
    this.users.push(user);
    return user;
  }

  async findByEmail(email) {
    const findUser = this.users.find(user => email === user.email);
    return findUser;
  }

  async findById(id) {
    const findUser = await this.users.find(user => user.id === id);
    return findUser;
  }

  async findAllProvider({
    except_user_id
  }) {
    const users = await this.users.filter(user => user.id !== except_user_id);
    return users;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;