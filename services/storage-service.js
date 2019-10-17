const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = {
  uploadImage,
};

function uploadImage(userId, image) {
  return s3.upload({
    Bucket: process.env.BUCKET_NAME,
    Key: createKey(userId),
    Body: image,
  }).promise();
}

function createKey(userId) {
  return `${userId}.jpg`;
}
