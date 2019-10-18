const fs = require('fs');
const handlers = require('../handlers');

const event = {
  queryStringParameters: {
    emotion: 'ANGRY',
  },
  body: JSON.stringify({
    photo: fs.readFileSync('./test1.jpg').toString('base64'),
  }),
};

handlers.playDiscountGame(event, {})
  .then(res => console.log(res));
