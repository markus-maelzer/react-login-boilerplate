const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router');
const { mongoose } = require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3090;

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

router(app);

app.listen(port, () => {
  console.log('Server is definately not starting on port: ', port);
});