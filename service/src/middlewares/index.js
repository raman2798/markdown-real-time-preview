const globalErrorHandlerMiddleware = require('./globalErrorHandler');
const validateRequestMiddleware = require('./validateRequest');

module.exports = {
  globalErrorHandlerMiddleware,
  validateRequestMiddleware,
};
