import {Platform} from 'react-native';

export const appConfig = {
  baseUrl: 'https://oneclub-test-server-production.up.railway.app/api/',
  settings: {
    isDev: __DEV__,
    logEnabled: true,
    isProduction: false,
    otpLength: 6,
  },
};
