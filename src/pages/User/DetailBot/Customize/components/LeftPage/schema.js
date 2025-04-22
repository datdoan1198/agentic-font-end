import Joi from "joi"

export const CustomizeSchema = Joi.object({
  url: Joi.string().required().label("Đường dẫn website"),
  name: Joi.string().required().label("Tên"),
  description: Joi.string().label("Mô tả"),
  welcome_messages: Joi.array().items(Joi.string()).default([]).label("Tin nhắn chào mừng"),
  quick_prompts: Joi.array().items(Joi.string()).default([]).label("Lời nhắc nhanh"),
  color: Joi.string().label("Màu sắc"),
  auto_display_chatbox: Joi.string().label("Tự động hiển thị khung chat"),
  logo: Joi.any().label("Logo"),
  favicon: Joi.any().label("Nút trò chuyện"),
})
