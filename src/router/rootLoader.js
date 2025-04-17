import {redirect} from "react-router-dom";
import store from "../states/configureStore";
import {initialSaga} from "../states/modules/routing/index.js";
import {setLocation} from "../states/modules/app/index.js";
import {getMe} from "@/api/admin/auth";
import {setAuthAdmin, setAuthUser} from "../states/modules/auth";
import {getAuthToken, getAuthTokenAdmin, removeAuthToken, removeAuthTokenAdmin} from "../utils/localStorage.js";
import {hasPermissions} from "../utils/helper.js";
import _ from "lodash";
import {getMeForUser} from "@/api/user/auth/index.js";
import {setBot} from "@/states/modules/detailBot/index.js";
import {setBotChats} from "@/states/modules/bot/index.js";
import {getInfoBot} from "@/api/user/bot/index.js";

export const rootLoader = async ({request, params}, requiredAuth, saga = null, permissions = []) => {
    const url = new URL(request.url);
    const isAdminRoute = url.pathname.startsWith('/admin');

    if (isAdminRoute) {
        let {isAuthAdminSuccess, authAdmin} = store.getState().auth;
        if (!isAuthAdminSuccess && getAuthTokenAdmin()) {
            try {
                const {data: res} = await getMe();
                isAuthAdminSuccess = true;
                authAdmin = res.data
                store.dispatch(setAuthAdmin({isAuthAdminSuccess, data: res.data}));
            } catch (error) {
                if (error.response?.data?.status === 401) {
                    removeAuthTokenAdmin();
                }
            }
        }

        if (isAuthAdminSuccess) {
            if (url.pathname === "/admin/login") {
                return redirect("/admin");
            }

            if (!_.isEmpty(permissions) && !hasPermissions(authAdmin.permissions, ...permissions)) {
                return redirect("/403")
            }
        } else {
            if (requiredAuth) {
                return redirect("/admin/login");
            }
        }
    } else {
        let {isAuthUserSuccess} = store.getState().auth;
        if (!isAuthUserSuccess && getAuthToken()) {
            try {
                const {data: res} = await getMeForUser();
                isAuthUserSuccess = true;
                store.dispatch(setAuthUser({isAuthUserSuccess, data: res.data}));
                store.dispatch(setBotChats(res.data.botChats));
            } catch (error) {
                if (error.response?.data?.status === 401) {
                    removeAuthToken();
                }
            }
        }

        if (isAuthUserSuccess) {
            if (url.pathname === "/login" || url.pathname === "/register") {
                return redirect("/");
            }
        } else {
            if (requiredAuth) {
                return redirect("/login");
            }
        }
    }

    let {bot} = store.getState().detailBot;
    if (!_.isEmpty(params.botId) && bot._id !== params.botId) {
        let isSuccess = true
        await getInfoBot(params.botId).then((res) => {
            store.dispatch(setBot(res.data.data));
        }).catch(() => {
            isSuccess = false
        })

        if (!isSuccess) {
            return redirect("/bot-chats");
        }
    }

    store.dispatch(
        setLocation({
            pathName: url.pathname,
            prevPathName: store.getState().app.location.pathName,
            params,
        }),
    );

    if (saga) {
        store.dispatch(initialSaga(saga));
    }

    return null;
};
