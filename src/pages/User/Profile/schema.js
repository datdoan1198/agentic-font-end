import Joi from "joi";

export const infoSchema = Joi.object({
    name: Joi.string().trim().required().label("Họ và tên"),
})

export const changePasswordSchema = Joi.object({
  password: Joi.string().required().min(6).label("Mật khẩu"),
  password_confirm: Joi.when('password', {
    is: Joi.exist(),
    then: Joi.valid(Joi.ref('password')).messages({
      'any.only': 'Xác nhận mật khẩu không khớp với mật khẩu',
    }),
  })
    .label("Xác nhận mật khẩu"),
})
