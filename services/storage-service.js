const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = { uploadImage, getUserImage, getFaceKey };

function uploadImage(userId, image) {
  return s3.upload({
    Bucket: process.env.BUCKET_NAME,
    Key: getFaceKey(userId),
    Body: Buffer.from(image, 'base64'),
  }).promise();
}

function getUserImage(userId) {
  return s3.getObject({
    Bucket: process.env.BUCKET_NAME,
    Key: getFaceKey(userId),
  }).promise()
    .then(results => {
      if (results && results.Body && results.Body.toString) {
        return results.Body.toString('base64');
      }
    });
}

function getFaceKey(userId) {
  return `${userId}.jpg`;
}
