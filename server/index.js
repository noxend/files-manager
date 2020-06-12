require('dotenv').config();
const express = require('express');
const passport = require('passport');
const logger = require('./logger');
const { user, file, folder } = require('./routes');

const app = express();
const port = process.env.PORT || 5500;

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

app.use(passport.initialize());
require('./middlewares/passport')(passport);

app.use('/v1/api/user', user);
app.use('/v1/api/file', file);
app.use('/v1/api/folder', folder);

app.use((err, req, res, _next) => {
  logger.error(err);

  if (err.validations) {
    const errors = [];

    err.validations.body.forEach(el => {
      errors.push({
        fieldName: el.property.split('.')[2],
        messages: el.messages
      });
    });
    logger.error(errors);
    return res.status(409).send(errors);
  }

  return res.status(err.status || 500).send(err);
});

app.listen(port, () => {
  logger.info(`Server is running on ${port}`);
});
