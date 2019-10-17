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
    }),
  };
}

function getErrorStatusCode(error) {
  if (error instanceof RequestError) {
    return StatusCodes.REQUEST_ERROR;
  }

  return StatusCodes.SERVER_ERROR;
}
