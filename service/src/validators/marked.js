const Joi = require('joi');

const convertMarkdownSchema = {
  body: Joi.object({
    markdown: Joi.string().required().label('Markdown'),
  }),
};

module.exports = {
  convertMarkdownSchema,
};
