import {apiCall} from './axios';

export const authSignup = (data: {
  phone: string;
  name: string;
  surname: string;
  password: string;
}) => {
  return apiCall.post('/auth/signup', data);
};

export const authLogin = (data: {phone: string; password: string}) => {
  return apiCall.post('/auth/signin', data);
};

export const fetchExpensesCategories = () => {
  return apiCall.get('/expenses/categories');
};
export const addExpenseCategory = (data: {name: string}) => {
  return apiCall.post('/expenses/categories', data);
};
export const fetchExpenses = (categoryId: string) => {
  return apiCall.get(`/expenses/${categoryId}`);
};
export const addExpense = (
  categoryId: string,
  data: {company_name?: String; date?: any; price: Number; rating?: Number},
) => {
  return apiCall.post(`/expenses/${categoryId}`, data);
};
export const updateExpense = (
  expense_id: string,
  data: {
    category_id: String;
    company_name?: String;
    date?: any;
    price: Number;
    rating?: Number;
  },
) => {
  return apiCall.put(`/expenses/${expense_id}`, data);
};

export const removeExpense = (expense_id: string) => {
  return apiCall.delete(`/expenses/${expense_id}`);
};
