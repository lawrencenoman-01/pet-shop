/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import { takeLatest, put, call } from 'redux-saga/effects';
import { midtrans } from '@domain/api';
import { ADD_TO_CART, MIDTRANS_REQUEST, REMOVE_FROM_CART_REQUEST } from './constants';
import { addToCartSuccess, midtransSuccess, removeFromCartFailure, removeFromCartSuccess } from './actions';

export function* handleAddToCart(action) {
  yield put(addToCartSuccess(action.payload));
}

export function* handleRemoveFromCart(action) {
  try {
    const itemIdToRemove = action.payload.id;

    yield put(removeFromCartSuccess(itemIdToRemove));
  } catch (err) {
    yield put(removeFromCartFailure(err.message));
  }
}

const fetchMidtransToken = (cartItems) => {
  const url = 'https://api.sandbox.midtrans.com/v2/charge';
  const serverKey = 'SB-Mid-server-TvgS5N9HpYGj8lgx3hvFPSFh';

  const midtransItems = cartItems.map((item) => ({
    id: item.id.toString(),
    price: item.price,
    quantity: item.stock,
    name: item.name,
  }));

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.stock, 0);

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${serverKey }:`)}`,
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: 'ORDER123',
        gross_amount: totalAmount,
      },
      item_details: midtransItems,
    })
  })
  .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error fetching Midtrans token:', error);
      throw error;
    });
}

export function* midtransSaga(action) {
  try {
    const midtransToken = yield call(fetchMidtransToken, action.payload.cartItems);
    yield put(midtransSuccess(midtransToken));
    // window.snap.pay(midtransToken.token, {
    //   onSuccess() {
    //     console.log('Successfully');
    //   },
    //   onPending(response) {
    //     console.log('Pending Payment!');
    //   },
    //   onError(response) {
    //     console.log('Error Payment!');
    //   },
    //   onClose() {
    //     console.log('you closed the popup without finishing the payment!');
    //   },
    // });
  } catch (err) {
    console.log(err, 'ERROR DATA');
  }
}

export default function* cartSaga() {
  yield takeLatest(ADD_TO_CART, handleAddToCart);
  // yield takeLatest(UPDATE_CART_ITEM_REQUEST, updateCartItemWorker);
  yield takeLatest(REMOVE_FROM_CART_REQUEST, handleRemoveFromCart);
  yield takeLatest(MIDTRANS_REQUEST, midtransSaga);
}
