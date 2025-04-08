import Joi from "joi";
import {VALIDATE_EMAIL_REGEX} from "@/utils/helper.js";

export const LoginSchema = Joi.object({
    email: Joi.string().trim().required().pattern(VALIDATE_EMAIL_REGEX).label("Email"),
    password: Joi.string().required().min(6).label("Mật khẩu"),
});
