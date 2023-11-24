/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { produce } from 'immer';

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
  PAYMENT_SUCCESS,
} from './constants';

export const initialState = {
  product: [],
  creating: false,
  deleting: false,
  createdProduct: null,
  loading: false,
  error: null,
  payment: null,
};

export const storedKey = [''];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_PRODUCT_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_PRODUCT_SUCCESS:
        return { ...state, loading: false, product: action.payload };
      case GET_PRODUCT_FAILURE:
        return { ...state, loading: false, error: action.payload };

      case GET_PRODUCT_ID_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_PRODUCT_ID_SUCCESS:
        return { ...state, product: action.payload, loading: false };
      case GET_PRODUCT_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };

      case CREATE_PRODUCT_REQUEST:
        return { ...state, creating: true, createdProduct: null, error: null };
      case CREATE_PRODUCT_SUCCESS:
        return { ...state, creating: false, createdProduct: action.payload };
      case CREATE_PRODUCT_FAILURE:
        return { ...state, creating: false, error: action.payload };

      case DELETE_PRODUCT_REQUEST:
        return { ...state, deleting: true, error: null };
      case DELETE_PRODUCT_SUCCESS:
        return { ...state, deleting: false };
      case DELETE_PRODUCT_FAILURE:
        return { ...state, deleting: false, error: action.payload };

      case PAYMENT_SUCCESS:
        draft.payment = action.payload;
        break;
      default:
        return state;
    }
  });

export default homeReducer;
