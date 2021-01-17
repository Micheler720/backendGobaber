"use strict";

var _tsyringe = require("tsyringe");

var _BCryptHashProvider = _interopRequireDefault(require("./HashProviders/implementations/BCryptHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.register('HashProvider', _BCryptHashProvider.default);