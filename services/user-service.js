const dynamoService = require('./dynamo-service');
const storageService = require('./storage-service');
const rekognitionService = require('./rekognition-service');

module.exports = {
  createUser,
};

function createUser(user, photo) {
  return Promise.all([
    dynamoService.createUser(user).catch(),
    storageService.uploadImage(user.id, photo)
      .then(() => rekognitionService.addUserFace(user.id)),
  ]);
}
