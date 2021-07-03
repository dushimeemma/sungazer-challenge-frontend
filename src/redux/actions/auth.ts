import { types } from './types';
import { setErrors } from './errors';
import axios from '../setAxios';

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

export const setLoading = () => {
  return {
    type: types.IS_LOADING,
  };
};

export const registerNewUser = (user: User) => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    const res = await axios.post('/api/auth/signup', user);
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
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setErrors(error.response.data.error));
  }
};
