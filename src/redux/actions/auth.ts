import axios from 'axios';

import { types } from './types';
import { setErrors } from './errors';

import setAxios from '../setAxios';

export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface Auth {
  email: string;
  password: string;
}

export interface Deposit {
  description: string;
  amount: any;
}

export const setLoading = () => {
  return {
    type: types.IS_LOADING,
  };
};

export const registerNewUser = (user: User) => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    const res = await axios.post('/api/auth/signup', user);
    localStorage.setItem('token', res.data.token);
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setErrors(error.response.data.error));
  }
};

export const loginUser = (user: Auth) => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    const res = await axios.post('/api/auth/login', user);
    localStorage.setItem('token', res.data.token);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setErrors(error.response.data.error));
  }
};

export const logout = () => async (dispatch: any) => {
  dispatch(setLoading());
  localStorage.removeItem('token');
  dispatch({
    type: types.LOGOUT_SUCCESS,
  });
};

export const getTransactionsByUser = () => async (dispatch: any) => {
  dispatch(setLoading());
  setAxios();
  try {
    const res = await axios.get('/api/transactions/user/transactions');
    dispatch({
      type: types.GET_TRANSACTIONS_BY_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setErrors(error.response.data.error));
  }
};

export const deposeAmount = (deposit: Deposit) => async (dispatch: any) => {
  dispatch(setLoading());
  setAxios();
  try {
    const res = await axios.post('/api/transactions/depose', deposit);
    dispatch({
      type: types.DEPOSE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setErrors(error.response.data.error));
  }
};

export const withdrawAmount = (withdraw: Deposit) => async (dispatch: any) => {
  dispatch(setLoading());
  setAxios();
  try {
    const res = await axios.post('/api/transactions/withdraw', withdraw);
    dispatch({
      type: types.WITHDRAW_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setErrors(error.response.data.error));
  }
};

export const clearMessage = () => {
  return {
    type: types.CLEAR_MESSAGE,
  };
};
