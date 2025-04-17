import axios from "axios";
import { getAuthToken, getAuthTokenAdmin } from "@/utils/localStorage.js";

const baseUrl = import.meta.env.VITE_API_URL;
const token = getAuthToken();
const tokenAdmin = getAuthTokenAdmin();

export const apiAxios = axios.create({
  withCredentials: true,
  baseURL: `${baseUrl}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

apiAxios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const apiAdminAxios = axios.create({
  withCredentials: true,
  baseURL: `${baseUrl}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: tokenAdmin ? `Bearer ${tokenAdmin}` : "",
  },
});

apiAdminAxios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiAdminAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
