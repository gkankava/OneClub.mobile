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
export const addExpenseCategory = (data: {categoryName: string}) => {
  return apiCall.post('/expenses/categories', data);
};
