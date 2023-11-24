import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import registerSaga from '@containers/Client/saga';
import productSaga from '@pages/Home/saga';
import cartSaga from '@pages/CartProduct/saga';
import addFormSaga from '@pages/AddProduct/saga';
import updateFormSaga from '@pages/UpdateProduct/saga';

export default function* rootSaga() {
  yield all([appSaga(), registerSaga(), productSaga(), cartSaga(), addFormSaga(), updateFormSaga()]);
}
