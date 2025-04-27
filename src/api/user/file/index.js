import {apiAxios} from "@/api/rootApi.js";

export const getListKnowledgeFiles = (bot_id, dataFilter) => {
    let path = `/bots/${bot_id}/files`;
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
}

export const createKnowledgeFiles = (bot_id, data) => {
    return apiAxios({
        method: "post",
        url: `/bots/${bot_id}/files`,
        data
    })
}

export const updateKnowledgeFiles = (bot_id, file_id, data) => {
    return apiAxios({
        method: "put",
        url: `/bots/${bot_id}/files/${file_id}`,
        data
    })
}

export const deleteKnowledgeFiles = (bot_id, file_id) => {
    return apiAxios({
        method: "delete",
        url: `/bots/${bot_id}/files/${file_id}`,
    })
}
