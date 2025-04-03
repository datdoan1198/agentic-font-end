import Joi from "joi";
import { VALIDATE_PHONE_REGEX_RULE } from "@/utils/helper";

export const LoginSchema = Joi.object({
  phone: Joi.string().trim().required().pattern(VALIDATE_PHONE_REGEX_RULE).label("Số điện thoại"),
  password: Joi.string().required().label("Mật khẩu"),
});
