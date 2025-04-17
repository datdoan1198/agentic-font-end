import {fork, all} from 'redux-saga/effects'
import appSaga from '../modules/app/saga.js';
import routeSaga from '../modules/routing/saga';

export default function* sagas() {
  yield all([
    fork(appSaga),
    fork(routeSaga),
  ]);
}
