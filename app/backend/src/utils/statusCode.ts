const statusCodeObject: { [param: string]: number } = {
  'string.min': 401,
  'string.base': 422,
  'string.empty': 400,
  'string.email': 401,
  'number.base': 422,
  'number.min': 422,
  'array.includesRequiredUnknowns': 422,
  'array.base': 422,
  'any.required': 400,
  'any.invalid': 422,
};

export default (type: string) => statusCodeObject[type] || 500;
