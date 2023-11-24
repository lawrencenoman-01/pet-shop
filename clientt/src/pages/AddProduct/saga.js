/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import { takeLatest, call, put } from 'redux-saga/effects';
import { ADD_PRODUCT_REQUEST } from './constant';
import { createProduct } from '@domain/api';
import Swal from 'sweetalert2';

const createProductSuccess = (message) =>
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  });

const emptyData = (message) =>
  Swal.fire({
    icon: 'error',
    title: 'Failed to Add Product',
    text: message,
  });

function* handleAddForm(action) {
  try {
    yield call(createProduct, action.payload);
    yield call(createProductSuccess, 'Successfully Create Product');
    window.location.href = '/';
  } catch (err) {
    const message = err.response.data.status;
    yield call(emptyData, `${message}`);
  }
}

export default function* addFormSaga() {
  yield takeLatest(ADD_PRODUCT_REQUEST, handleAddForm);
}
