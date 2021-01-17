"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _redis = _interopRequireDefault(require("redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisClient = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  points: 5,
  // Maximo de requisições
  duration: 1 // Per second

});

async function rateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    next();
  } catch (err) {
    throw new _AppError.default('To many Requests', 429);
  }
}