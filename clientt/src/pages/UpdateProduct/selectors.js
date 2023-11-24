import { createSelector } from 'reselect';
import { initialState } from './reducers';

const updateState = (state) => state.update || initialState;

export const selectProduct = createSelector(updateState, (state) => state.product);
