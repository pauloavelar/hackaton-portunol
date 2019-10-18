const createUser = require('./lambdas/create-user');
const findUserByFace = require('./lambdas/find-user-by-face');
const playDiscountGame = require('./lambdas/play-discount-game');

module.exports = {
  createUser,
  findUserByFace,
  playDiscountGame,
};
