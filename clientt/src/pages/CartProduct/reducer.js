/* eslint-disable no-case-declarations */
import { produce } from 'immer';

import {
  ADD_TO_CART_SUCCESS,
  DECREASE_ITEM_QUANTITY,
  INCREASE_ITEM_QUANTITY,
  MIDTRANS_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
} from './constants';

export const initialState = {
  midtransToken: null,
  cartItems: [],
};

export const storedKey = ['cartItems'];

const cartReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_TO_CART_SUCCESS:
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      case INCREASE_ITEM_QUANTITY:
        const increasedItem = draft.cartItems.find((item) => item.id === action.payload.itemId);
        if (increasedItem) {
          increasedItem.stock += 1;
        }
        break;
      case DECREASE_ITEM_QUANTITY:
        const decreasedItem = draft.cartItems.find((item) => item.id === action.payload.itemId);
        if (decreasedItem) {
          decreasedItem.stock = Math.max(1, decreasedItem.stock - 1);
        }
        break;

      case REMOVE_FROM_CART_SUCCESS:
        draft.cartItems = draft.cartItems.filter((item) => item.id !== action.payload.id);
        break;

      case MIDTRANS_SUCCESS:
        draft.midtransToken = action.payload;
        break;
      default:
        return state;
    }
  });

export default cartReducer;
