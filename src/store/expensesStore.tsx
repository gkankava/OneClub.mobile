import {AxiosError, AxiosResponse} from 'axios';
import {
  addExpenseCategory,
  addExpensesCategories,
  fetchExpensesCategories,
} from '../api/lib';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: [],
};

export const expensesStore = (set: any, get: any) => ({
  expenses: initialState,
  getExpensesCategories: async () => {
    set(() => ({
      expenses: {
        ...initialState,
        loading: true,
      },
    }));
    fetchExpensesCategories()
      .then((res: AxiosResponse) => {
        set(() => ({
          expenses: {
            ...initialState,
            loading: false,
            success: true,
            data: [...res.data],
          },
        }));
      })
      .catch((err: AxiosError) => {
        set(() => ({
          expenses: {
            ...initialState,
            loading: false,
            error: err.response?.data?.error?.message,
          },
        }));
      });
  },
  addNewCategory: async (
    data: {categoryName: string},
    callback: () => void,
  ) => {
    set((state: any) => ({
      expenses: {
        ...state.expenses,
        loading: true,
      },
    }));
    addExpenseCategory(data)
      .then((res: AxiosResponse) => {
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            success: true,
            error: null,
            data: [...state.expenses.data, res.data],
          },
        }));
      })
      .catch((err: AxiosError) => {
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            data: [...state.expenses.data],
            error: err.response?.data?.error?.message,
          },
        }));
      })
      .finally(() => {
        callback();
      });
  },
});
