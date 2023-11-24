import { produce } from 'immer';

import {
  SET_LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from '@containers/Client/constants';

export const initialState = {
  user: null,
  role: null,
  login: false,
  token: null,
  loading: false,
  error: null,
};

export const storedKey = ['token', 'login', 'role'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        draft.role = action.role;
        draft.token = action.token;
        break;
      case LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
      case LOGIN_SUCCESS:
        return { ...state, loading: false };
      case LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case LOGOUT:
        return { ...state, token: null };
      case REGISTER_REQUEST:
        return { ...state, loading: true, error: null };
      case REGISTER_SUCCESS:
        return { ...state, loading: false };
      case REGISTER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  });

export default clientReducer;
