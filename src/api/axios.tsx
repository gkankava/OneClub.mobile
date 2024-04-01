import axios from 'axios';
import {appConfig} from '../../appConfig';
import {StorageHelper} from '../helpers/StorageHelper';

export const apiCall = axios.create({
  baseURL: appConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setBearerToker = async (token: string | null) => {
  if (token) {
    apiCall.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await StorageHelper.set('authToken', token);
  } else {
    apiCall.defaults.headers.common['Authorization'] = ``;
    await StorageHelper.remove('authToken');
  }
};
