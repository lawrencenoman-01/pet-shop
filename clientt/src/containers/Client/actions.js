import {
  SET_LOGIN,
  SET_TOKEN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '@containers/Client/constants';

// Login
export const setLogin = (login, role, token) => ({
  type: SET_LOGIN,
  login,
  role,
  token,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const loginRequest = (userData) => ({
  type: LOGIN_REQUEST,
  payload: userData,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

// Register
export const registerRequest = (userData) => ({
  type: REGISTER_REQUEST,
  payload: userData,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});
