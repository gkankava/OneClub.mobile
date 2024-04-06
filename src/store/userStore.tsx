import {AxiosError, AxiosResponse} from 'axios';
import {authLogin, authSignup} from '../api/lib';
import {StorageHelper} from '../helpers/StorageHelper';
import {setBearerToker} from '../api/axios';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

export const userStore = (set: any, get: any) => ({
  user: initialState,
  authLoginUser: async (
    data: {phone: string; password: string},
    callback: () => void,
  ) => {
    set(() => ({
      user: {
        ...initialState,
        loading: true,
      },
    }));
    authLogin(data)
      .then((res: AxiosResponse) => {
        set(() => ({
          user: {
            ...initialState,
            loading: false,
            success: true,
            data: {...res.data.user},
          },
        }));
        setBearerToker(res.data.token);
        StorageHelper.set('authToken', res.data.token);
        callback();
      })
      .catch((err: AxiosError) => {
        set(() => ({
          user: {
            ...initialState,
            loading: false,
            error: err.response?.data?.error?.message,
          },
        }));
      });
  },
  authRegisterUser: async (
    data: {phone: string; name: 'string'; surname: string; password: string},
    callback: () => void,
  ) => {
    set(() => ({
      user: {
        ...initialState,
        loading: true,
      },
    }));
    authSignup(data)
      .then((res: AxiosResponse) => {
        set(() => ({
          user: {
            ...initialState,
            loading: false,
            success: true,
            data: {...res.data.user},
          },
        }));
        setBearerToker(res.data.token);
        StorageHelper.set('authToken', res.data.token);
        callback();
      })
      .catch((err: AxiosError) => {
        set(() => ({
          user: {
            ...initialState,
            loading: false,
            error: err.response?.data?.error?.message,
          },
        }));
      });
  },
});
