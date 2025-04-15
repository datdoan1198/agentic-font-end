import callAPI from "../callAPI"

import {
  // DELETE BOT
  requestDeleteBot,
  deleteBotSuccess,
  deleteBotFailed,
  // CREATE LINK
  requestGetLinks,
  getLinksSuccess,
  getLinksFailed,
  // CREATE LINK
  requestCreateLink,
  createLinkSuccess,
  createLinkFailed,
  // DELETE LINK
  requestDeleteLink,
  deleteLinkSuccess,
  deleteLinkFailed,
} from "../../states/modules/bot"

// ========== DELETE BOT ========== //
export const deleteBot = (botId) => async (dispatch, getState) => {
  let path = `/bots/${botId}`
  return callAPI({
    method: "delete",
    apiPath: path,
    actionTypes: [requestDeleteBot, deleteBotSuccess, deleteBotFailed],
    variables: {},
    dispatch,
    getState,
  })
}

// ========== GET LINKS ========== //
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

// ========== CREATE LINK ========== //
export const createLink = (botId, url) => async (dispatch, getState) => {
  let path = `/bots/${botId}/links`

  return callAPI({
    method: "post",
    apiPath: path,
    actionTypes: [requestCreateLink, createLinkSuccess, createLinkFailed],
    variables: url,
    dispatch,
    getState,
  })
}

// ========== DELETE LINK ========== //
export const deleteLink = (botId, linkId) => async (dispatch, getState) => {
  let path = `/bots/${botId}/links/${linkId}`

  return callAPI({
    method: "delete",
    apiPath: path,
    actionTypes: [requestDeleteLink, deleteLinkSuccess, deleteLinkFailed],
    variables: {},
    dispatch,
    getState,
  })
}
