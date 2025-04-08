import Joi from "joi";
import {VALIDATE_EMAIL_REGEX} from "@/utils/helper.js";

export const RegisterSchema = Joi.object({
    name: Joi.string().trim().required().label("Họ và tên"),
    email: Joi.string().trim().required().pattern(VALIDATE_EMAIL_REGEX).label("Email"),
    password: Joi.string().required().min(6).label("Mật khẩu"),
    password_confirm: Joi.when('password', {
            is: Joi.exist(),
            then: Joi.valid(Joi.ref('password')).messages({
                'any.only': 'Xác nhận mật khẩu không khớp với mật khẩu',
            }),
        })
        .label("Xác nhận mật khẩu"),
});
