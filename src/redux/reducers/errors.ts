import { types } from '../actions/types';

const initialState = {
  error: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};
