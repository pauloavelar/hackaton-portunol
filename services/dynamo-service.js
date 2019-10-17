const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB({
  region: 'us-east-1',
});
const converter = AWS.DynamoDB.Converter;

module.exports = {
  createUser,
};

function createUser(user) {
  return dynamo.putItem({
    TableName: process.env.DYNAMO_TABLE,
    Item: converter.marshall(user),
  }).promise();
}
