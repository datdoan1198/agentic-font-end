import {apiAxios} from "@/api/rootApi.js";

export const getListBotChats = () => {
  return apiAxios({
    method: "get",
    url: "/bots",
  });
};

export const createBotChat = (data) => {
  return apiAxios({
    method: "post",
    url: "/bots",
    data,
  });
};

export const changeStatusBot = (data, botId) => {
  return apiAxios({
    method: "put",
    url: `/bots/${botId}/change-status`,
    data,
  });
};

export const updateActiveUrlsBotChat = (botId, data) => {
  return apiAxios({
    method: "put",
    url: `/bots/${botId}/active-urls`,
    data,
  });
};

export const deleteBot = (botId) => {
  return apiAxios({
    method: "delete",
    url: `/bots/${botId}`,
  });
};

export const getInfoBot = (botId) => {
  const url = `/bots/${botId}`;
  return apiAxios({
    method: "get",
    url: url,
  });
};

export const getListPageFB = (botId) => {
  return apiAxios({
    method: "get",
    url: `/bots/${botId}/list-page-fb`,
  });
};

export const selectPageFB = (data, botId) => {
  return apiAxios({
    method: "post",
    url: `/bots/${botId}/select-page-fb`,
    data,
  });
};

export const unlinkPageFB = (botId) => {
  return apiAxios({
    method: "post",
    url: `/bots/${botId}/unlink-page`,
  });
};

export const getGeneralStats = (botId, data) => {
  return apiAxios({
    method: "get",
    url: `/bots/${botId}/dashboard/general-statistics`,
    params: data,
  });
};

export const getLastestMessageStats = (botId) => {
  return apiAxios({
    method: "get",
    url: `/bots/${botId}/dashboard/latest-message`,
  });
};

export const getMessageStatsByDay = (botId) => {
  return apiAxios({
    method: "get",
    url: `/bots/${botId}/dashboard/total-message-by-day`,
  });
};
