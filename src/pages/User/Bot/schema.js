import Joi from "joi";

export const createBotSchema = Joi.object({
    url: Joi.string().required().label('Đường dẫn')
});
