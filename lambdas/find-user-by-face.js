'use strict';

const httpHelper = require('../helpers/http-helpers');
const dynamoService = require('../services/dynamo-service');
const storageService = require('../services/storage-service');
const rekognitionService = require('../services/rekognition-service');

module.exports = async (event, context) => {
  context.callbackWaitsForEmptyLoop = false;

  const body = JSON.parse(event.body);
  const photo =  body.photo;

  return rekognitionService.findUserByFace(photo)
    .then(async (results) => {
      if (!results.userId) {
        return {
          face_found: results.faceFound,
        };
      }

      return Promise.all([
        dynamoService.searchUser(results.userId),
        storageService.getUserImage(results.userId),
      ]).then(([user = {}, photo]) => {
        return {
          face_found: true,
          user: { ...user, photo },
        };
      });
    })
    .then(body => httpHelper.buildHttpResponse(200, body))
    .catch(err => httpHelper.buildErrorResponse(err));
};
