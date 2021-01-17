"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    try {
      const createService = _tsyringe.container.resolve(_CreateUserService.default);

      const {
        name,
        password,
        email
      } = request.body;
      const user = await createService.execute({
        name,
        password,
        email
      });
      return response.json((0, _classTransformer.classToClass)(user));
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

}

exports.default = UsersController;