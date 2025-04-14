import {apiAxios} from "@/api/rootApi.js";

export const getListBotChats = () => {
    return apiAxios({
        method: "get",
        url: "/bot",
    });
};

export const createBotChat = (data) => {
    return apiAxios({
        method: "post",
        url: "/bot",
        data,
    });
};

export const getInfoBot = (botId) => {
    const url = `/bot/${botId}`
    return apiAxios({
        method: "get",
        url: url,
    });
};

export const getListPageFB = (botId) => {
    return apiAxios({
        method: "get",
        url: `/bot/${botId}/list-page-fb`,
    });
};

export const selectPageFB = (data, botId) => {
    return apiAxios({
        method: "post",
        url: `/bot/${botId}/select-page-fb`,
        data,
    });
};
