"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ProvidersMap {
  static toDTO(users) {
    const usersMapped = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar: user.avatar
    }));
    return usersMapped;
  }

}

var _default = ProvidersMap;
exports.default = _default;