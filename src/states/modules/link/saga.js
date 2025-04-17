import {
    all, fork
} from "redux-saga/effects";

function* loadRouteData () {
    yield
}

function* handleActions () {

}

export default function* loadDetailBotSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
