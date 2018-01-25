const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// morgan == logger
const morgan = require('morgan');

const router = require('./router');
const { mongoose } = require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));


router(app);

app.listen(port, () => {
  console.log('Server is definately not starting on port: ', port);
});
