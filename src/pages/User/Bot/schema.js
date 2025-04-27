import Joi from "joi";

export const createBotWithUrlSchema = Joi.object({
    url: Joi.string().required().label('đường dẫn'),
})

export const createBotWithFileSchema = Joi.object({
    name: Joi.string().required().label('Tên bot'),
    description: Joi.string().required().label('Mô tả'),
    color: Joi.string().required().label('Màu sắc'),
    logo: Joi.any().invalid(null).required().label('Logo'),
    logo_message: Joi.any().invalid(null).required().label('Logo nút trò chuyện'),
    file: Joi.any().invalid(null).required().label('File'),
})
