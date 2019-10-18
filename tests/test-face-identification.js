const fs = require('fs');
const handlers = require('../handlers');

const event = {
  body: JSON.stringify({
    photo: fs.readFileSync('./test1.jpg').toString('base64'),
  }),
};

handlers.findUserByFace(event, {})
  .then(res => console.log(res));
