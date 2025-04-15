import callAPI from "../callAPI"

import { requestGetLinks, getLinksSuccess, getLinksFailed } from "../../states/modules/bot"

export const getLinks = (botId, payload) => async (dispatch, getState) => {
  let path = `/bots/${botId}/links`

  if (payload && payload.page) {
    path += `?page=${payload.page}`
  }
  if (payload && payload.perPage) {
    path += `&per_page=${payload.perPage}`
  }
  if (payload && payload.keySearch) {
    path += `&q=${payload.keySearch}`
  }

  return callAPI({
    method: "get",
    apiPath: path,
    actionTypes: [requestGetLinks, getLinksSuccess, getLinksFailed],
    variables: {},
    dispatch,
    getState,
  })
}
