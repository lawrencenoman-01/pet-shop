import { UPDATE_PRODUCT_REQUEST, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from './constants';

export const updateProductRequest = (payload) => ({
  type: UPDATE_PRODUCT_REQUEST,
  payload,
});
export const fetchDataRequest = (id) => ({
  type: FETCH_DATA_REQUEST,
  id,
});
export const fetchDataSuccess = (payload) => ({
  type: FETCH_DATA_SUCCESS,
  payload,
});
