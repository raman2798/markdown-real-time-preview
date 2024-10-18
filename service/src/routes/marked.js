const { Router } = require('express');
const { forEach } = require('lodash');
const { markedController } = require('../controllers');
const { validateRequestMiddleware } = require('../middlewares');
const { markedValidation } = require('../validators');

const router = Router();

const { convertMarkdownSchema } = markedValidation;

const { convertMarkdownHandler } = markedController;

const routes = [{ path: '/convert', method: 'post', middlewares: [validateRequestMiddleware(convertMarkdownSchema)], handler: convertMarkdownHandler }];

forEach(routes, ({ path, method, middlewares, handler }) => {
  router[method](path, ...middlewares, handler);
});

module.exports = router;
