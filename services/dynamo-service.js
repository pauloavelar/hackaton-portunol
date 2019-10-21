const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB({
  region: process.env.AWS_REGION,
});

module.exports = { createUser, searchUser };

function createUser(user) {
  return dynamo.putItem({
    TableName: process.env.DYNAMO_TABLE,
    Item: AWS.DynamoDB.Converter.marshall(user),
  }).promise();
}

function searchUser(userId) {
  return dynamo.getItem({
    TableName: process.env.DYNAMO_TABLE,
    Key: {
      id: { S: userId },
    },
  }).promise()
    .then(user => {
      if (user && user.Item) {
        return AWS.DynamoDB.Converter.unmarshall(user.Item);
      }
    });
}
