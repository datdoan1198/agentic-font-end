import { apiAxios } from "@/api/rootApi.js";

export const getListLinks = (bot_id, dataFilter) => {
    let path = `/bots/${bot_id}/links`;
    if (dataFilter && dataFilter.perPage && dataFilter.page) {
        path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;
        if (dataFilter.keySearch) {
            path += `&q=${dataFilter.keySearch}`;
        }
    }

    return apiAxios({
        method: "get",
        url: path,
    })
};

export const createLink = (bot_id, data) => {
  return apiAxios({
    method: "post",
    url: `/bots/${bot_id}/links`,
    data,
  });
};

export const getDetailLink = (linkId) => {
  return apiAxios({
    method: "get",
    url: `http://localhost:3001/links/${linkId}`,
  });
};

export const deleteLink = (linkId) => {
  return apiAxios({
    method: "delete",
    url: `http://localhost:3001/links/${linkId}`,
  });
};
