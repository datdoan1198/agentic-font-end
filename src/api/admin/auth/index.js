import { apiAdminAxios } from "@/api/rootApi.js";

export const getMe = (data = {}) => {
  return apiAdminAxios({
    method: "get",
    url: "/admin/auth/me",
    data,
  });
};

export const login = (data) => {
  return apiAdminAxios({
    method: "post",
    url: "/admin/auth/login",
    data,
  });
};

export const logout = () => {
  return apiAdminAxios({
    method: "post",
    url: "/admin/auth/logout",
  });
};
