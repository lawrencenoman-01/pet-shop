/* eslint-disable no-unused-vars */
import {
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  MIDTRANS_REQUEST,
  MIDTRANS_SUCCESS,
} from './constants';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});
export const addToCartSuccess = (product) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: product,
});

export const increaseItemQuantity = (itemId) => ({
  type: INCREASE_ITEM_QUANTITY,
  payload: { itemId },
});
export const decreaseItemQuantity = (itemId) => ({
  type: DECREASE_ITEM_QUANTITY,
  payload: { itemId },
});
// export const updateCartItemRequest = (item) => ({
//   type: UPDATE_CART_ITEM_REQUEST,
//   payload: item,
// });
// export const updateCartItemSuccess = (item) => ({
//   type: UPDATE_CART_ITEM_SUCCESS,
//   payload: item,
// });
// export const updateCartItemFailure = (error) => ({
//   type: UPDATE_CART_ITEM_FAILURE,
//   payload: error,
// });

export const removeFromCartRequest = (item) => ({
  type: REMOVE_FROM_CART_REQUEST,
  payload: item,
});
export const removeFromCartSuccess = (id) => ({
  type: REMOVE_FROM_CART_SUCCESS,
  payload: { id },
});
export const removeFromCartFailure = (error) => ({
  type: REMOVE_FROM_CART_FAILURE,
  payload: { error },
});

export const midtransRequest = (payload) => ({
  type: MIDTRANS_REQUEST,
  payload,
});
export const midtransSuccess = (payload) => ({
  type: MIDTRANS_SUCCESS,
  payload,
});
