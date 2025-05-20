import Joi from "joi";

export const UpdateActiveUrlsBotChatSchema = Joi.object({
    active_urls: Joi.string().required().label("Danh sách đường dẫn"),
});
