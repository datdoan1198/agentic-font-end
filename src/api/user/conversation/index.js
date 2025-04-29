import {apiAxios} from "@/api/rootApi.js";

export const getListConversations = (bot_id, dataFilter) => {
    let path = `/bots/${bot_id}/conversations`;

    if (dataFilter && dataFilter.keySearch) {
        path += `?q=${dataFilter.keySearch}`;
    }
    if (dataFilter && dataFilter.type !== 'ALL') {
        if (dataFilter.keySearch) {
            path += `&type=${dataFilter.type}`;
        } else {
            path += `?type=${dataFilter.type}`;
        }
    }

    return apiAxios({
        method: "get",
        url: path
    })
}

export const getListMessageOfConversation = (bot_id, conversation_id) => {
    return apiAxios({
        method: "get",
        url: `/bots/${bot_id}/conversations/${conversation_id}/messages?page=1&per_page=20`,
    })
}

export const getAllMessageFlowConversation = (botId, conversationId) => {
    return apiAxios({
        method: "get",
        url: `/bots/${botId}/conversations/${conversationId}/messages`,
    })
}
