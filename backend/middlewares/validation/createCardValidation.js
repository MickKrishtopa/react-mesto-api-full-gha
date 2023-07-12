const { celebrate, Joi } = require('celebrate');
const regexUrlAvatar = require('../../utils/constants');

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regexUrlAvatar).required(),
  }),
});

module.exports = { createCardValidation };
