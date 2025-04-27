import {apiAxios} from "@/api/rootApi.js";

export const getInfoBotOfChat = (botId) => {
    return apiAxios({
        method: "get",
        url: `/bots/${botId}/chat`,
    })
}

export const activeSendMessage = (botId, data) => {
    return apiAxios({
        method: "post",
        url: `/bots/${botId}/chat`,
        data
    })
}
