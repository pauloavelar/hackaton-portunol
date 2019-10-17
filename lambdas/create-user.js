'use strict';

const userService = require('../services/user-service');

module.exports = async (event, context) => {
  context.callbackWaitsForEmptyLoop = false;

  const body = JSON.parse(event.body);

  const user = {
    id: body.user_id,
    name: body.user_name,
    access_token: body.access_token,
  };
  const photo = body.photo;

  return userService.createUser(user, photo)
    .then(res => httpHelper.buildHttpResponse(200))
    .catch(err => httpHelper.buildErrorResponse(err));
};
