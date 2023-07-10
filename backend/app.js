/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/routes');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb', CORS_URL = 'http://localhost:3000' } = process.env;

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

app.use(cors({ origin: CORS_URL, credentials: true }));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(requestLogger);
app.use('/api', routes);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
