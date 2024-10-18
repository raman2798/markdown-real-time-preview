const Joi = require('joi');
const dotenv = require('dotenv');
const { get, reduce } = require('lodash');

dotenv.config();

const allowedEnvironments = ['development', 'staging', 'production'];

// Define the schema for the environment variables
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...allowedEnvironments)
    .required()
    .description('Application environment'),
  SERVER_PORT: Joi.number().default(5000).description('Server port'),
}).unknown();

// Validate and extract environment variables
const { value: envVars, error: validationError } = envSchema.validate(process.env, { errors: { label: 'key' } });

// Throw an error if validation fails
if (validationError) {
  const errorMessage = reduce(get(validationError, 'details'), (acc, { message }) => `${acc}, ${message.replace(/"/g, '')}`, '').slice(2);

  throw new Error(`Config validation error: ${errorMessage}`);
}

// Build the configuration object
const config = {
  allowedEnvironments,
  nodeEnv: get(envVars, 'NODE_ENV'),
  serverPort: get(envVars, 'SERVER_PORT'),
};

module.exports = config;
