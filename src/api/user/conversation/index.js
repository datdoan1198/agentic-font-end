import {apiAxios} from "@/api/rootApi.js";

export const getListConversations = (bot_id) => {
  return apiAxios({
    method: "get",
    url: `/bots/${bot_id}/conversations`,
  })
}

export const getListMessageOfConversation = (bot_id, conversation_id) => {
  return apiAxios({
    method: "get",
    url: `/bots/${bot_id}/conversations/${conversation_id}/messages?page=1&per_page=20`,
  })
}
