import { createSelector } from 'reselect';
import { initialState } from '@pages/CartProduct/reducer';

const selectCartState = (state) => state.cart || initialState;

export const selectCart = createSelector(selectCartState, (state) => state.cartItems);
export const selectMidtrans = createSelector(selectCartState, (state) => state.midtransToken);
