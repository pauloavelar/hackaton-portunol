'use strict';

const httpHelper = require('../helpers/http-helpers');

module.exports = async (event, context) => {
  return httpHelper.buildHttpResponse(200);
};
