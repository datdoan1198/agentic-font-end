import {apiAxios} from "@/api/rootApi.js";

export const registerForUser = (data) => {
    return apiAxios({
        method: "post",
        url: "/auth/register",
        data,
    });
};

export const loginForUser = (data) => {
  return apiAxios({
    method: "post",
    url: "/auth/login",
    data,
  });
};

export const logoutForUser = () => {
  return apiAxios({
    method: "post",
    url: "/auth/logout",
  });
};

export const getMeForUser = (data = {}) => {
    return apiAxios({
        method: "get",
        url: "/auth/me",
        data,
    });
};
