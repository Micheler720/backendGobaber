"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

var _tsyringe = require("tsyringe");

var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  async show(request, response) {
    const showProfile = _tsyringe.container.resolve(_ShowProfileService.default);

    const user_id = request.user.id;
    const user = await showProfile.execute({
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(user)).status(200);
  }

  async update(request, response) {
    const user_id = request.user.id;
    const {
      name,
      email,
      password,
      old_password
    } = request.body;

    const updateProfile = _tsyringe.container.resolve(_UpdateProfileService.default);

    const user = await updateProfile.execute({
      email,
      name,
      user_id,
      old_password,
      password
    });
    return response.json((0, _classTransformer.classToClass)(user)).status(200);
  }

}

var _default = ProfileController;
exports.default = _default;