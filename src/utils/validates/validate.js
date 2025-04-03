import {cloneDeep, noop} from 'lodash'

export const JOI_DEFAULT_MESSAGE = {
  // boolean
  'boolean.base': '{{#label}} sai định dạng.',
  
  // string
  'string.base': '{{#label}} sai định dạng.',
  'string.empty': '{{#label}} không được bỏ trống.',
  'string.min': '{{#label}} không được ít hơn {{#limit}} ký tự.',
  'string.max': '{{#label}} không được vượt quá {{#limit}} ký tự.',
  'string.pattern.base': '{{#label}} không đúng định dạng.',
  'string.email': '{{#label}} không đúng định dạng.',
  
  // number
  'number.base': '{{#label}} sai định dạng.',
  'number.integer': '{{#label}} sai định dạng.',
  'number.min': '{{#label}} không được nhỏ hơn {{#limit}}.',
  'number.max': '{{#label}} không được lớn hơn {{#limit}}.',
  
  // array
  'array.base': '{{#label}} sai định dạng.',
  'array.unique': 'Các {{#label}} không được giống nhau.',
  'array.min': '{{#label}} không được ít hơn {{#limit}} phần tử.',
  'array.max': '{{#label}} không được vượt quá {{#limit}} phần tử.',
  'array.length': '{{#label}} phải có đúng {{#limit}} phần tử.',
  'array.includesRequiredUnknowns': '{{#label}} không hợp lệ.',
  'array.includesRequiredKnowns': '{{#label}} không hợp lệ.',
  
  // object
  'object.base': '{{#label}} sai định dạng.',
  'object.unknown': 'Trường {#key} không được xác định.',
  'object.instance': '{{#label}} không đúng định dạng.',
  
  // binary
  'binary.base': '{{#label}} sai định dạng.',
  'binary.min': '{{#label}} không được ít hơn {{#limit}} bytes.',
  'binary.max': '{{#label}} không được vượt quá {{#limit}} bytes.',
  
  // any
  'any.only': "{{#label}} phải là {if(#valids.length == 1, '', 'một trong ')}{{#valids}}.",
  'any.required': '{{#label}} không được bỏ trống.',
  'any.unknown': 'Trường {#key} không được xác định.',
  'any.invalid': '{{#label}} không hợp lệ.',
  'any.exists': '{{#label}} đã tồn tại.',
}

export const JOI_DEFAULT_OPTIONS = {
  abortEarly: false,
  errors: {
    wrap: {label: false},
    language: {'any.exists': 'any.exists'},
  },
  stripUnknown: true,
}

export function validate(schema, data, event = {onSuccess: noop, onError: noop}) {
  const { value, error } = schema.validate(data, {
    ...JOI_DEFAULT_OPTIONS,
    messages: JOI_DEFAULT_MESSAGE,
    context: {
      data: cloneDeep(data),
    },
  });
  if (error) {
    const details = error.details.reduce(function (pre, curr) {
      const path = curr.path.join('.')
      if (!(path in pre)) {
        pre[path] = curr.message
      }
      return pre
    }, {})
    event.onError(details)
  } else {
    event.onSuccess(value)
  }
}
