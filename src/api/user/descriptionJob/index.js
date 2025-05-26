import {apiAxios} from "@/api/rootApi.js";

export const getListDescriptionJobs = () => {
    return apiAxios({
        method: "get",
        url: "/description-jobs",
    });
};
