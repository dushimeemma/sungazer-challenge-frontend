import { types } from '../actions/types';

const initialState = {
  user: {},
  token: null,
  message: '',
  isLoading: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
      };
    case types.SET_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case types.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
