import { ADD_PRODUCT_REQUEST } from './constant';

export const addProductRequest = (payload) => ({
  type: ADD_PRODUCT_REQUEST,
  payload,
});
