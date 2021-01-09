import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import isAlpha from 'validator/lib/isAlpha';
import isNumeric from 'validator/lib/isNumeric';

const validateFields = (form) => Object.fromEntries(Object.entries(form).map(([key, value]) => {
  let error = null;
  if (value === '') {
    return [key, null];
  }
  switch (key) {
    case 'email':
      error = isEmail(value)
        ? null
        : 'Invalid email address';
      break;
    case 'lName':
      error = isLength(value, { min: 2 }) && isAlpha(value)
        ? null
        : 'Invalid last name';
      break;
    case 'fName':
      error = isLength(value, { min: 2 }) && isAlpha(value)
        ? null
        : 'Invalid first name';
      break;
    case 'phone':
      error = isLength(value, { min: 8, max: 16 }) && isNumeric(value)
        ? null
        : 'Invalid phone number';
      break;
    case 'name':
      error = isLength(value, { min: 2 }) && isAlpha(value)
        ? null
        : 'Invalid name';
      break;
    case 'height':
      error = !Number.isNaN(Number(value))
        ? null
        : 'Height should be a number';
      break;
    case 'weight':
      error = !Number.isNaN(Number(value))
        ? null
        : 'Height should be a number';
      break;
    case 'tagline':
      error = isLength(value, { max: 64 })
        ? null
        : 'Tagline should be up to 64 characters';
      break;
    default:
      break;
  }
  return [key, error];
}));

export default validateFields;
