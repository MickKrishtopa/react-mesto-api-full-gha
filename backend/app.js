/* eslint-disable no-console */
require('dotenv').config(); // check
const express = require('express'); // check
const mongoose = require('mongoose'); // check
const bodyParser = require('body-parser'); // check
const cors = require('cors'); // check
const { errors } = require('celebrate'); // check
const cookieParser = require('cookie-parser'); // check
const { requestLogger, errorLogger } = require('./middlewares/logger'); // check

const routes = require('./routes/routes');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb', CORS_URL = 'http://localhost:3000' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to BD');
  })
  .catch((err) => {
    console.log('Fail connected to BD');
    console.log(err.message);
  });

const app = express();

console.log('CORS_URL', CORS_URL);
app.use(cors({ origin: CORS_URL, credentials: true }));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
