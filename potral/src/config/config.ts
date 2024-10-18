/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { get } from 'lodash';
import * as yup from 'yup';
import { type IConfiguration, type IEnvVars } from './config.interfaces';

// Define the schema for the environment variables using Yup
const envVarsSchema: yup.ObjectSchema<IEnvVars> = yup.object({
  VITE_API_URL: yup.string().required('Base url of the API is required').label('Base URL'),
});

// Validate and extract environment variables
const validateEnvVars = (): { envVars: IEnvVars; error: string | null } => {
  try {
    const envVars = envVarsSchema.validateSync(import.meta.env, { abortEarly: false }) as IEnvVars;

    return { envVars, error: null };
  } catch (error) {
    const errorMessage: string = (error as yup.ValidationError).errors.join(', ');

    return { envVars: {} as IEnvVars, error: `Config validation error: ${errorMessage}` };
  }
};

const { envVars, error } = validateEnvVars();

if (error) {
  throw new Error(error);
}

const appConfiguration: IConfiguration = {
  baseUrl: get(envVars, 'VITE_API_URL'),
};

export default appConfiguration;
