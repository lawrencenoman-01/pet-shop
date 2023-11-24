import { produce } from 'immer';

import { FETCH_DATA_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: null,
  product: null,
};

export const storedKey = [];

const updateFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_DATA_SUCCESS:
        draft.product = action.payload;
        break;
      default:
        return state;
    }
  });

export default updateFormReducer;
