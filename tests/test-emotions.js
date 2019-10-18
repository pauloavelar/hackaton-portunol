const fs = require('fs');
const rekognitionService = require('../services/rekognition-service');

const photo = fs.readFileSync('./test4.jpg').toString('base64');

rekognitionService.detectEmotions(photo).then(console.log);
