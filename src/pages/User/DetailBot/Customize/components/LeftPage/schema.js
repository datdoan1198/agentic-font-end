import Joi from "joi"

export const CustomizeSchema = Joi.object({
    name: Joi.string().required().label('Tên bot'),
    description: Joi.string().required().label('Mô tả'),
    logo_message: Joi.any().invalid(null).required().label('Logo nút trò chuyện'),
    color: Joi.string().required().label('Màu sắc'),
    logo: Joi.any().invalid(null).required().label('Logo doanh nghiệp'),
    name_business: Joi.string().required().label('Tên doanh nghiệp'),
    is_order: Joi.bool().required().label('Trạng thái đặt hàng'),
    form_order: Joi.string()
        .when('is_order', {
            is: true,
            then: Joi.string().required().label('Form đặt hàng'),
            otherwise: Joi.string().allow('').label('Form đặt hàng'),
        }),
})
