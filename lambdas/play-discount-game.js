'use strict';

const httpHelper = require('../helpers/http-helpers');
const rekognitionService = require('../services/rekognition-service');

module.exports = async (event, context) => {
  context.callbackWaitsForEmptyLoop = false;

  const body = JSON.parse(event.body);
  const photo =  body.photo;
  const emotion = event.queryStringParameters && event.queryStringParameters.emotion;

  return rekognitionService.detectEmotions(photo, emotion)
    .then(async (emotion = {}) => {
      const rate = emotion.rate || 0;

      return {
        emotion_rate: Math.round(rate * 10000) / 10000,
        discount_percentage: calculateDiscount(rate),
      };
    })
    .then(body => httpHelper.buildHttpResponse(200, body))
    .catch(err => httpHelper.buildErrorResponse(err));
};

function calculateDiscount(rate = 0) {
  const maxDiscount = process.env.MAX_DISCOUNT || 5;
  return Math.min(maxDiscount, Math.round(maxDiscount * rate / 100));
}
