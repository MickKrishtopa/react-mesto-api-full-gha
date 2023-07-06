/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/routes');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

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

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
