import { isFunction } from "lodash"
import axios from "axios"
import { setAuthUser } from "@/states/modules/auth/index.js"
import { getAuthToken, removeAuthToken } from "@/utils/localStorage.js"

export default async function callAPI({
  method,
  apiPath,
  actionTypes: [requestType, successType, failureType],
  variables,
  dispatch,
  getState,
  headers,
}) {
  if (!isFunction(dispatch) || !isFunction(getState)) {
    throw new Error("callGraphQLApi requires dispatch and getState functions")
  }

  let baseUrlApi = import.meta.env.VITE_API_URL
  const token = getAuthToken()
  const header = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }
  dispatch({ type: requestType, meta: { variables } })
  return axios({
    baseURL: baseUrlApi,
    headers: headers ? { ...headers, ...header } : header,
    method,
    url: apiPath,
    data: variables,
    params: method === "get" ? variables : "",
  })
    .then(function (response) {
      dispatch({ type: successType, meta: { variables }, payload: response.data })
      return response.data
    })
    .catch(function (error) {
      let response = error.response ? error.response : error
      dispatch({ type: failureType, meta: { variables }, payload: error.response })
      if (!navigator.onLine) {
        //
      }
      if (response.status === 401) {
        removeAuthToken()
        dispatch(setAuthUser({ isAuthUserSuccess: false, data: {} }))
      } else if (response.status === 403) {
        //
      } else if (
        response.status === 404 &&
        response.status !== 400 &&
        response.status !== 500 &&
        response.status !== 422
      ) {
        //
      }
      return {
        errorCode: response.status,
        errorMessage: response.statusText,
      }
    })
}
