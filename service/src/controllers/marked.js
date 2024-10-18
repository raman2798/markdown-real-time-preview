const { marked } = require('marked');
const { transformErrorUtilities, transformResponseUtilities } = require('../utilities');

const convertMarkdownHandler = async (req, res, next) => {
  try {
    const {
      body: { markdown },
    } = req;

    const html = marked(markdown);

    res.json(transformResponseUtilities({ data: html }));
  } catch (error) {
    next(transformErrorUtilities(error));
  }
};

module.exports = {
  convertMarkdownHandler,
};
