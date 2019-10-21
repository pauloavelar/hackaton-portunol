'use strict';

const httpHelper = require('../helpers/http-helper');
const dynamoService = require('./dynamo-service');
const storageService = require('./storage-service');
const rekognitionService = require('./rekognition-service');

module.exports = async (event, context) => {
  context.callbackWaitsForEmptyLoop = false;

  const body = JSON.parse(event.body);

  const user = {
    id: body.user_id,
    name: body.user_name,
    access_token: body.access_token,
  };
  const photo = body.photo;

  return Promise.all([
    dynamoService.createUser(user),
    storageService.uploadImage(user.id, photo)
      .then(() => rekognitionService.addUserFace(user.id)),
  ]).then(() => httpHelper.buildHttpResponse(200, { success: true }))
    .catch(err => httpHelper.buildErrorResponse(err));
};
