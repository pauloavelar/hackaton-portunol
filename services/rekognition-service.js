const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition({
  region: 'us-east-1',
});

const storageService = require('./storage-service');

module.exports = {
  addUserFace,
  findUserByFace,
  detectEmotions,
};

function addUserFace(userId) {
  return rekognition.indexFaces({
    CollectionId: process.env.FACE_COLLECTION,
    ExternalImageId: userId,
    Image: {
      S3Object: {
        Bucket: process.env.BUCKET_NAME,
        Name: storageService.getFaceKey(userId),
      },
    },
  }).promise();
}

function findUserByFace(photo) {
  return rekognition.searchFacesByImage({
    CollectionId: process.env.FACE_COLLECTION,
    Image: {
      Bytes: Buffer.from(photo, 'base64'),
    },
  }).promise().then(results => {
    if (results.FaceMatches && results.FaceMatches[0]) {
      const match = results.FaceMatches[0];
      console.log(`Face found. Similarity: ${match.Similarity}%`);

      if (match.Face && match.Similarity >= (process.env.SIMILARITY_THRESHOLD || 50)) {
        return {
          faceFound: true,
          userId: match.Face.ExternalImageId,
        };
      }
    }

    return { faceFound: true };
  }).catch(err => {
    console.error(`Error recognizing face: ${err.message}`);
    return { faceFound: false };
  });
}

function detectEmotions(photo) {
  return rekognition.detectFaces({
    Attributes: ['ALL'],
    Image: {
      Bytes: Buffer.from(photo, 'base64'),
    },
  }).promise().then(results => {
    const face = results.FaceDetails && results.FaceDetails[0];
    return getPrimaryEmotion(face && face.Emotions);
  });
}

function getPrimaryEmotion(emotions = []) {
  return emotions.sort((a, b) => b.Confidence - a.Confidence)[0];
}
