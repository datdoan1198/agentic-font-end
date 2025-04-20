import {
    all, fork, takeLatest, select, put, call
} from "redux-saga/effects";
import {deleteLinkFailed, deleteLinkSuccess, rescanLinkFailed, rescanLinkSuccess} from "@/states/modules/bot/index.js";
import {getLinks} from "@/api/bot/index.js";
import {getNotification} from "@/utils/helper.js";

function* loadRouteData () {
    yield
}

const paginationListLink = {
    keySearch: "",
    page: 1,
    perPage: 10,
    status: "",
}

function* reloadLinks() {
    const {detailBot} = yield select();
    yield put(getLinks(detailBot.bot._id, paginationListLink))
}

function* handleActions () {
    yield takeLatest(rescanLinkSuccess, function* () {
        yield call(getNotification, "success", "Quét link thành công.");
        yield* reloadLinks();
    });

    yield takeLatest(rescanLinkFailed, function* (error) {
        yield call(getNotification, "error", error.message || "Có lỗi xảy ra khi quét link.");
        yield* reloadLinks();
    });

    yield takeLatest(deleteLinkSuccess, function* () {
        yield call(getNotification, "success", "Xóa link thành công.");
        yield* reloadLinks();
    });

    yield takeLatest(deleteLinkFailed, function* (error) {
        yield call(getNotification, "error", error.message || "Có lỗi xảy ra khi xóa link.");
        yield* reloadLinks();
    });
}

export default function* loadDetailBotSaga() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}
