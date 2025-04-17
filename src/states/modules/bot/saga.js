import {
    all, fork
} from "redux-saga/effects";

function* loadRouteData () {
    yield
}

function* handleActions () {

}

export default function* loadBotSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
