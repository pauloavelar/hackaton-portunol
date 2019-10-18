const fs = require('fs');
const handlers = require('./handlers');
const dynamoService = require('./services/dynamo-service');

dynamoService.searchUser('2000').then(console.log);
