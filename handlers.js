const createUser = require('./lambdas/create-user');
const findUserByFace = require('./lambdas/find-user-by-face');
const checkoutOrder = require('./lambdas/checkout-order');

module.exports = {
  createUser,
  findUserByFace,
  checkoutOrder,
};
