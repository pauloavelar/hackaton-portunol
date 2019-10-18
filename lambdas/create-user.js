'use strict';

const userService = require('../services/user-service');
const httpHelper = require('../helpers/http-helpers');

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
    .then(res => httpHelper.buildHttpResponse(200, { success: true }))
    .catch(err => httpHelper.buildErrorResponse(err));
};
