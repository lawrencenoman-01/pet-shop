/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { takeLatest, call, put } from "redux-saga/effects";

import Swal from 'sweetalert2';
import { FETCH_DATA_REQUEST, UPDATE_PRODUCT_REQUEST } from "./constants";

import { getProductById, updateProduct } from "@domain/api";
import { fetchDataSuccess } from "./actions";

const updateProductSuccess = (message) =>
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  });

const emptyData = (message) =>
  Swal.fire({
    icon: 'error',
    title: 'Failed to Update Product',
    text: message,
  });

function* handleUpdateForm(action) {
  try {
    const { formDataObj, id } = action.payload;
    yield call(updateProduct, { formDataObj, id });
    yield call(updateProductSuccess, 'Successfully Update Product');
    window.location.href = '/';

  } catch (err) {
    const message = err.response.data.status;
    yield call(emptyData, `${message}`);
  }
}

function* fetchUpdateDataSaga({ id }) {
  try {
    const data = yield call(getProductById, id)
    yield put(fetchDataSuccess(data))
  } catch (err) {
    const message = err.response.data.status;
    yield call(emptyData, `${message}`);
  }
}

export default function* updateFormSaga() {
  yield takeLatest(UPDATE_PRODUCT_REQUEST, handleUpdateForm)
  yield takeLatest(FETCH_DATA_REQUEST, fetchUpdateDataSaga)
}

