import Joi from "joi";

export const UpdateActiveUrlsBotChatSchema = Joi.object({
    active_urls: Joi.array()
        .items(
            Joi.string()
                .uri()
                .label('Đường dẫn hợp lệ')
                .messages({
                    'string.uri': '{{#label}} phải là một liên kết hợp lệ (vd: https://...)',
                    'string.base': '{{#label}} phải là chuỗi',
                })
        )
        .label('Danh sách đường dẫn')
        .messages({
            'array.base': '{{#label}} phải là một mảng',
        })
});
