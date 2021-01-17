"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptyHashProvider {
  async generatHash(payload) {
    const hashed = await (0, _bcryptjs.hash)(payload, 8);
    return hashed;
  }

  async compareHash(payload, hashed) {
    const isValid = await (0, _bcryptjs.compare)(payload, hashed);
    return isValid;
  }

}

exports.default = BCryptyHashProvider;