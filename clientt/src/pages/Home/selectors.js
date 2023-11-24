import { createSelector } from 'reselect';
import { initialState } from '@pages/Home/reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectProduct = createSelector(selectHomeState, (state) => state.product);
export const selectError = createSelector(selectHomeState, (state) => state.error);
export const selectDeleting = createSelector(selectHomeState, (state) => state.deleting);
export const selectDetail = createSelector(selectHomeState, (state) => state.product);
export const selectPayment = createSelector(selectHomeState, (state) => state.payment);
