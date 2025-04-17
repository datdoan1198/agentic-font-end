import { apiAxios } from "@/api/rootApi.js"

export const getListBotChats = () => {
  return apiAxios({
    method: "get",
    url: "/bots",
  })
}

export const createBotChat = (data) => {
  return apiAxios({
    method: "post",
    url: "/bots",
    data,
  })
}

export const getInfoBot = (botId) => {
  const url = `/bots/${botId}`
  return apiAxios({
    method: "get",
    url: url,
  })
}

export const getListPageFB = (botId) => {
  return apiAxios({
    method: "get",
    url: `/bots/${botId}/list-page-fb`,
  })
}

export const selectPageFB = (data, botId) => {
  return apiAxios({
    method: "post",
    url: `/bots/${botId}/select-page-fb`,
    data,
  })
}
