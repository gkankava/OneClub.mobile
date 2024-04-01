import {create} from 'zustand';
import {userStore} from './userStore';
import {expensesStore} from './expensesStore';

export const useRootStore: any = create((set: any, get: any) => ({
  ...userStore(set, get),
  ...expensesStore(set, get),
}));
