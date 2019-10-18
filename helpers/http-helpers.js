const RequestError = require('../errors/request-error');

module.exports = {
  buildHttpResponse,
  buildErrorResponse,
};

function buildHttpResponse(statusCode, body) {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : '',
  };
}

function buildErrorResponse(error) {
  return {
    statusCode: getErrorStatusCode(error),
    body: JSON.stringify({
      error: error.message,
      stack: error.stack,
    }),
  };
}

function getErrorStatusCode(error) {
  return error instanceof RequestError ? 400 : 500;
}
