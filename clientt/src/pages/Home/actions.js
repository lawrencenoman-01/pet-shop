/* eslint-disable arrow-body-style */
import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_ID_REQUEST,
  GET_PRODUCT_ID_SUCCESS,
  GET_PRODUCT_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
} from './constants';

// Get All Product
export const getProductRequest = () => ({
  type: GET_PRODUCT_REQUEST,
});
export const getProductSuccess = (product) => {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload: product,
  };
};
export const getProductFailure = (error) => ({
  type: GET_PRODUCT_FAILURE,
  payload: error,
});

// Get Product By Id
export const getProductIdRequest = (id) => ({
  type: GET_PRODUCT_ID_REQUEST,
  payload: id,
});
export const getProductIdSuccess = (product) => {
  return {
    type: GET_PRODUCT_ID_SUCCESS,
    payload: product,
  };
};
export const getProductIdFailure = (error) => ({
  type: GET_PRODUCT_ID_FAILURE,
  payload: error,
});

// Create Product
export const createProductRequest = (productData) => ({
  type: CREATE_PRODUCT_REQUEST,
  payload: productData,
});
export const createProductSuccess = (createdProduct) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: createdProduct,
});
export const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

// Delete Product
export const deleteProductRequest = (id) => ({
  type: DELETE_PRODUCT_REQUEST,
  payload: id,
});
export const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
});
export const deleteProductFailure = (error) => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error,
});

// Midtrans
export const paymentRequest = (payload) => ({
  type: PAYMENT_REQUEST,
  payload,
});

export const paymentSuccess = (payload) => ({
  type: PAYMENT_SUCCESS,
  payload,
});
