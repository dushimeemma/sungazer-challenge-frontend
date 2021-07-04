import { types } from '../actions/types';

const initialState = {
  user: {},
  token: null,
  message: '',
  isLoading: false,
  transactions: [],
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
    case types.LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        user: {},
        token: null,
        message: '',
        transactions: [],
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
    case types.GET_TRANSACTIONS_BY_USER:
      return {
        ...state,
        message: action.payload.message,
        transactions: action.payload.transactions,
        isLoading: false,
      };
    case types.DEPOSE_SUCCESS:
    case types.WITHDRAW_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        isLoading: false,
      };
    case types.CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
        isLoading: false,
      };
    default:
      return state;
  }
};
