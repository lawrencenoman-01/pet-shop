/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, SET_TOKEN, SET_LOGIN } from './constants';
import { login, register } from '@domain/api';
import { registerSuccess, registerFailure, loginSuccess } from './actions';

import Swal from 'sweetalert2';

const createRegisterSuccess = (message) =>
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  });

const emptyData = (message) =>
  Swal.fire({
    icon: 'error',
    title: 'Failed to Register',
    text: message,
  });

const failedLogin = (message) =>
  Swal.fire({
    icon: 'error',
    title: 'Failed to Login Account',
    text: message,
  });

function* handleRegister(action) {
  try {
    yield call(register, action.payload);
    yield put(registerSuccess());
    yield call(createRegisterSuccess, 'Successfully Registered Account');
    window.location.href = '/login';
  } catch (err) {
    const message = err.response.data.status;
    yield call(emptyData, `${message}`);
  }
}

function* handleLogin(action) {
  try {
    const response = yield call(login, action.payload);
    // console.log(response, '<<<< Client');
    const token = response.token;
    const role = response.role;

    yield put({ type: SET_LOGIN, token, role, login: true });
    yield call(createRegisterSuccess, 'Successfully Login');
    window.location.href = '/';
  } catch (err) {
    const message = err.response.data.status;
    yield call(failedLogin, `${message}`);
  }
}

export default function* registerSaga() {
  yield takeLatest(REGISTER_REQUEST, handleRegister);
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
