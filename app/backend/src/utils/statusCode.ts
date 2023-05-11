const statusCodeObject: { [param: string]: number } = {
  'string.min': 422,
  'string.base': 422,
  'number.base': 422,
  'number.min': 422,
  'array.includesRequiredUnknowns': 422,
  'array.base': 422,
  'any.required': 400,
};

export default (type: string) => statusCodeObject[type] || 500;
