import {DEV_API_URL, DEV_API_KEY, PROD_API_URL, PROD_API_KEY} from '@env';

const devEnvVariables = {
  API_URL: DEV_API_URL || 'https://api.themoviedb.org/3',
  API_KEY: DEV_API_KEY || '0a265acc28d52ce1f04daa506f78f4e0',
};

const prodEnvVariables = {
  API_URL: PROD_API_URL || 'https://api.themoviedb.org/3',
  API_KEY: PROD_API_KEY || '0a265acc28d52ce1f04daa506f78f4e0',
};

export default __DEV__ ? devEnvVariables : prodEnvVariables;
