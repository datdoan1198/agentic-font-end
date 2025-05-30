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

export const getMeForUser = () => {
    return apiAxios({
        method: "get",
        url: "/auth/me",
    });
};

export const getChangeProfile = (data = {}) => {
  return apiAxios({
    method: "put",
    url: "/auth/me",
    data,
  });
};

export const changePassword = (data = {}) => {
    return apiAxios({
        method: "put",
        url: "/auth/change-password",
        data,
    });
};

export const forgotPassword = (email) => {
  return apiAxios({
    method: "post",
    url: "/auth/forgot-password",
    data: { email },
  });
}

export const resetPassword = (data) => {
  return apiAxios({
    method: "put",
    url: "/auth/reset-password",
    data,
  });
}