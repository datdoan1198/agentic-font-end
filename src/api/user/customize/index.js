import { apiAxios } from "@/api/rootApi.js"

export const updateConfigBot = (data, botId) => {
  return apiAxios({
    method: "put",
    url: `/bots/${botId}`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
