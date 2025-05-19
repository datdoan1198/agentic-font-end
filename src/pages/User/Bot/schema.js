import Joi from 'joi'

export const createBotSchema = Joi.object({
  name: Joi.string().required().label('Tên bot'),
  description: Joi.string().required().label('Mô tả'),
  logo_message: Joi.any().invalid(null).required().label('Logo nút trò chuyện'),
  color: Joi.string().required().label('Màu sắc'),
  logo: Joi.any().invalid(null).required().label('Logo doanh nghiệp'),
  name_business: Joi.string().required().label('Tên doanh nghiệp'),
})

export const createBotInfoSchema = Joi.object({
  name: Joi.string().required().label('Tên bot'),
  description: Joi.string().required().label('Mô tả'),
  logo_message: Joi.any().invalid(null).required().label('Logo nút trò chuyện'),
  color: Joi.string().required().label('Màu sắc'),
})

export const createBotKnowledgeSchema = Joi.object({
  url: Joi.string().required().label('Đường dẫn'),
})

export const createBotCompanySchema = Joi.object({
  logo: Joi.any().invalid(null).required().label('Logo doanh nghiệp'),
  name_business: Joi.string().required().label('Tên doanh nghiệp'),
})
