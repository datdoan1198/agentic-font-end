import loadHomeSaga from "../states/modules/home/saga.js";
import loadBotSaga from "@/states/modules/bot/saga.js";
import loadDetailBotSaga from "@/states/modules/detailBot/saga.js";

export const ROUTE_SAGAS = {};

ROUTE_SAGAS['LOAD_HOME_PAGE'] = loadHomeSaga
ROUTE_SAGAS['LOAD_BOT_PAGE'] = loadBotSaga
ROUTE_SAGAS['LOAD_DETAIL_BOT_PAGE'] = loadDetailBotSaga
