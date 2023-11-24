/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import {
  GET_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  GET_PRODUCT_ID_REQUEST,
  GET_PRODUCT_ID_SUCCESS,
  PAYMENT_REQUEST,
} from './constants';
import {
  createProductFailure,
  deleteProductFailure,
  deleteProductSuccess,
  getProductFailure,
  getProductIdFailure,
  getProductIdSuccess,
  getProductRequest,
  getProductSuccess,
  paymentSuccess,
} from './actions';
import { deleteProduct, getProduct, getProductById, midtrans } from '@domain/api';

function* handleGetProducts() {
  try {
    const response = yield call(getProduct);
    const products = response.data;
    yield put(getProductSuccess(products));
  } catch (err) {
    yield put(getProductFailure(err.message));
  }
}

function* handleGetProductsId(action) {
  try {
    const id = action.payload;
    const response = yield call(getProductById, id);
    yield put(getProductIdSuccess(response));
  } catch (err) {
    yield put(getProductIdFailure(err.message));
  }
}

function* handleCreateProduct(action) {
  try {
    // ascasc
  } catch (err) {
    yield put(createProductFailure(err.message));
  }
}

function* handleDeleteProduct(action) {
  try {
    yield call(deleteProduct, action.payload.id);
    yield put(deleteProductSuccess());
    yield put(getProductRequest());
  } catch (err) {
    yield put(deleteProductFailure(err.message));
  }
}

function* paymentSaga(data) {
  try {
    const response = yield call(midtrans, data);
    yield put(paymentSuccess(response.token));
    window.snap.pay(response.token, {
      onSuccess() {
        toast.success('Payment Successful!');
      },
      onPending() {
        toast.error('Pending Payment!');
      },
      onError(response) {
        toast.error('Error Payment!');
      },
      onClose() {
        toast.error('Widget is closed without completing the payment!');
      },
    });
  } catch (err) {
    console.log(err, 'ERROR DATA');
  }
}

export default function* productSaga() {
  yield takeLatest(GET_PRODUCT_REQUEST, handleGetProducts);
  yield takeLatest(GET_PRODUCT_ID_REQUEST, handleGetProductsId);
  yield takeLatest(CREATE_PRODUCT_REQUEST, handleCreateProduct);
  yield takeLatest(DELETE_PRODUCT_REQUEST, handleDeleteProduct);
  yield takeLatest(PAYMENT_REQUEST, paymentSaga);
}
