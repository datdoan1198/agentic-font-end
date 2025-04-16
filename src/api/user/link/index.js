import { apiAxios } from "@/api/rootApi.js";

export const getListLinks = () => {
  return apiAxios({
    method: "get",
    url: "http://localhost:3001/links",
  });
};

export const createLink = (data) => {
  return apiAxios({
    method: "post",
    url: "http://localhost:3001/links",
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
