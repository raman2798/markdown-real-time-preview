const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { NOT_FOUND } = require('http-status');
const { appConfiguration, loggerConfiguration } = require('./config');
const { globalErrorHandlerMiddleware } = require('./middlewares');
const { initializeRoutes } = require('./routes');

const { serverPort } = appConfiguration;

/**
 * Setup error handling middleware.
 * Handles unknown API requests and global error handling.
 */
const setupErrorHandling = (app) => {
  // Handle unknown API requests
  app.use((req, res, next) => next({ statusCode: NOT_FOUND, message: 'Invalid endpoint' }));

  // Global error handler middleware
  app.use(globalErrorHandlerMiddleware);
};

/**
 * Setup middleware stack for the Express app.
 * Includes parsing request bodies, security headers, CORS, etc.
 */
const setupMiddlewares = (app) => {
  // Parse JSON request bodies (limit: 10MB)
  app.use(express.json({ limit: '10mb' }));

  // Parse URL-encoded request bodies with extended limit
  app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

  // Enable CORS with wide access
  app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

  // Set secure HTTP headers with Helmet
  app.use(helmet());

  // Hide server technology information by disabling the 'x-powered-by' header
  app.disable('x-powered-by');
};

/**
 * Setup application routes.
 * Includes API routes and health check endpoint.
 */
const setupAppRoutes = (app) => {
  // Initialize all API routes
  initializeRoutes(app);

  // Health check route for application status
  app.use('/health-check', (req, res) => res.json({ message: 'Application is running successfully!' }));
};

/**
 * Gracefully shuts down the server.
 * Ensures the server closes and logs the shutdown event.
 */
const shutdownServerGracefully = (server) => {
  server.close(() => {
    loggerConfiguration.info('Server closed');

    // Exit the process after shutdown
    process.exit(0);
  });
};

/**
 * Handle unexpected errors (e.g., uncaught exceptions or unhandled rejections).
 * Logs the error and gracefully shuts down the server.
 */
const handleUnexpectedError = (error, server) => {
  loggerConfiguration.error(`Unexpected error: ${error}`);

  // Shutdown server on critical errors
  shutdownServerGracefully(server);
};

/**
 * Start the Express server.
 * Configures middleware, routes, error handling, database connection, and handles server errors.
 */
const initializeServer = async () => {
  try {
    // Create an instance of the Express app
    const app = express();

    // Setup middleware stack for handling requests
    setupMiddlewares(app);

    // Setup application routes
    setupAppRoutes(app);

    // Setup error handling middleware
    setupErrorHandling(app);

    // Start the server on the configured port
    const server = app.listen(serverPort, () => {
      loggerConfiguration.info(`Server is running on port ${serverPort}`);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => handleUnexpectedError(error, server));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (error) => handleUnexpectedError(error, server));
  } catch (error) {
    // Log error if the server fails to start, then exit the process
    loggerConfiguration.error(`Failed to start server: ${error}`);

    // Exit process with a failure code
    process.exit(1);
  }
};

// Start the Express server
initializeServer();
