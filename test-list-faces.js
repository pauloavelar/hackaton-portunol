const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition({
  region: 'us-east-1',
});

rekognition.listFaces({
  CollectionId: 'portunol-user-faces',
}).promise().then(res => console.log(JSON.stringify(res, null, 2)));
