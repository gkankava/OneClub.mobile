import {AxiosError, AxiosResponse} from 'axios';
import {
  addExpense,
  addExpenseCategory,
  fetchExpenses,
  fetchExpensesCategories,
  removeExpense,
  updateExpense,
} from '../api/lib';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: {
    categories: [],
    expenses: [],
  },
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
            data: {
              categories: [...res.data?.categories],
            },
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
  addNewCategory: async (data: {name: string}, callback: () => void) => {
    set((state: any) => ({
      expenses: {
        ...state.expenses,
        data: state.expenses.data,
        loading: true,
        error: null,
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
            data: {
              categories: [...state.expenses.data.categories, res.data],
            },
          },
        }));
        callback();
      })
      .catch((err: AxiosError) => {
        let message = err.response?.data?.error?.message;
        if (!message) {
          console.log(err);
          set((state: any) => ({
            expenses: {
              ...state.expenses,
              loading: false,
              data: initialState.data,
              error: 'Unexpected error',
            },
          }));
          return;
        }
        if (message?.includes('duplicate key error')) {
          set((state: any) => ({
            expenses: {
              ...state.expenses,
              loading: false,
              data: initialState.data,
              error: 'category already exists',
            },
          }));
          return;
        } else {
          console.log(err);
          set((state: any) => ({
            expenses: {
              ...state.expenses,
              loading: false,
              data: initialState.data,
              error: 'Unexpected error',
            },
          }));
        }
      });
  },
  getExpenses: async (category_id: string) => {
    set((state: any) => ({
      expenses: {
        ...state.expenses,
        data: {
          categories: state.expenses.data.categories,
          expenses: [],
        },
        loading: true,
        error: null,
      },
    }));
    fetchExpenses(category_id)
      .then(res => {
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            success: true,
            error: null,
            data: {
              categories: state.expenses.data.categories,
              expenses: res.data,
            },
          },
        }));
      })
      .catch(err => {
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            data: {
              categories: state.expenses.data.categories,
              expenses: [],
            },
            error: err.response?.data?.error?.message || 'Unexpected error',
          },
        }));
      });
  },
  addNewExpense: async (
    data: {company_name?: String; date?: any; price: Number; rating?: Number},
    categoryId: string,
    callback: () => void,
  ) => {
    set((state: any) => ({
      expenses: {
        ...state.expenses,
        data: {
          categories: state.expenses.data.categories,
          expenses: state.expenses.data.expenses,
        },
        loading: true,
        error: null,
      },
    }));
    addExpense(categoryId, data)
      .then((res: AxiosResponse) => {
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            success: true,
            error: null,
            data: {
              categories: state.expenses.data.categories,
              expenses: res.data,
            },
          },
        }));
        callback();
      })
      .catch((err: AxiosError) => {
        let message = err.response?.data?.error?.message;
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            data: {
              categories: state.expenses.data.categories,
              expenses: state.expenses.data.expenses,
            },
            error: message || 'Unexpected error',
          },
        }));
      });
  },
  UpdateExistingExpense: async (
    expense_id: string,
    data: {
      category_id: string;
      company_name?: String;
      date?: any;
      price: Number;
      rating?: Number;
    },
    callback: () => void,
  ) => {
    set((state: any) => ({
      expenses: {
        ...state.expenses,
        data: {
          categories: state.expenses.data.categories,
          expenses: state.expenses.data.expenses,
        },
        loading: true,
        error: null,
      },
    }));
    updateExpense(expense_id, data)
      .then((res: AxiosResponse) => {
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            success: true,
            error: null,
            data: {
              categories: state.expenses.data.categories,
              expenses: res.data,
            },
          },
        }));
        callback();
      })
      .catch((err: AxiosError) => {
        let message = err.response?.data?.error?.message;
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            data: {
              categories: state.expenses.data.categories,
              expenses: state.expenses.data.expenses,
            },
            error: message || 'Unexpected error',
          },
        }));
      });
  },
  deleteExpense: async (expense_id: string, callback: () => void) => {
    set((state: any) => ({
      expenses: {
        ...state.expenses,
        data: {
          categories: state.expenses.data.categories,
          expenses: state.expenses.data.expenses,
        },
        loading: true,
        error: null,
      },
    }));
    removeExpense(expense_id)
      .then((res: AxiosResponse) => {
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            success: true,
            error: null,
            data: {
              categories: state.expenses.data.categories,
              expenses: res.data,
            },
          },
        }));
        callback();
      })
      .catch((err: AxiosError) => {
        let message = err.response?.data?.error?.message;
        set((state: any) => ({
          expenses: {
            ...state.expenses,
            loading: false,
            data: {
              categories: state.expenses.data.categories,
              expenses: state.expenses.data.expenses,
            },
            error: message || 'Unexpected error',
          },
        }));
      });
  },
});
