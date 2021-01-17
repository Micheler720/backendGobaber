"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUsersAvatarService = _interopRequireDefault(require("../../../services/UpdateUsersAvatarService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAvatarController {
  async update(request, response) {
    const updateServiceAvatar = _tsyringe.container.resolve(_UpdateUsersAvatarService.default);

    const user = await updateServiceAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    });
    return response.status(200).json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UserAvatarController;