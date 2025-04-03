import {
  all, fork,
  put
} from "redux-saga/effects";
import { setBreadcrumb, setTitlePage } from "../app";

function* loadRouteData() {
  yield put(setTitlePage('Tổng quan'));
  yield put(
    setBreadcrumb([
      {
        path: '/',
        name: 'Trang chủ',
      },
      {
        path: '/',
        name: 'Tổng quan',
      },
    ])
  );
}

function* handleActions() {

}

export default function* homeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
