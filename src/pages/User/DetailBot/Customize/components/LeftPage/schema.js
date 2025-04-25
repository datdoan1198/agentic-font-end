import Joi from "joi"

export const CustomizeSchema = Joi.object({
  name: Joi.string().required().label("Tên"),
  favicon: Joi.any().label("Nút trò chuyện"),
  description: Joi.string().label("Mô tả"),
  logo_message: Joi.any().label("Logo nút trò chuyện"),
  welcome_messages: Joi.array().items(Joi.string()).default([]).label("Tin nhắn chào mừng"),
  quick_prompts: Joi.array().items(Joi.string()).default([]).label("Lời nhắc nhanh"),
  color: Joi.string().label("Màu sắc"),
  auto_display_chatbox: Joi.string().label("Tự động hiển thị khung chat"),
})
