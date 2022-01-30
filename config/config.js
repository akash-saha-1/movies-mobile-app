import {DEV_API_URL, DEV_API_KEY, PROD_API_URL, PROD_API_KEY} from '@env';

const devEnvVariables = {
  API_URL: DEV_API_URL,
  API_KEY: DEV_API_KEY,
};

const prodEnvVariables = {
  API_URL: PROD_API_URL,
  API_KEY: PROD_API_KEY,
};

export default __DEV__ ? devEnvVariables : prodEnvVariables;
