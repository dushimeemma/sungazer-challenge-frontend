import { types } from './types';

export const setErrors = (error: any) => {
  return {
    type: types.SET_ERROR,
    payload: error,
  };
};

export const clearErrors = () => {
  return {
    type: types.CLEAR_ERROR,
  };
};
