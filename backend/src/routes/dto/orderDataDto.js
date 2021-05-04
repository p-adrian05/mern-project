const { body } = require('express-validator');

module.exports = [
  body('cost', 'Invalid cost').isInt().exists(),
  body('description', ' Description is too long').isLength({ max: 1500 }).notEmpty().withMessage('Description can not be empty'),
  body('contact_data', 'Contact data not exists').exists(),
  body('contact_data.zip_code', 'Invalid zip code').matches(/^[0-9]{4}$/),
  body('contact_data.city', 'Invalid city').matches(/^[A-Z][a-z]*$/).isLength({ max: 30 }),
  body('contact_data.street', 'Street not exists').exists().notEmpty().withMessage('Street name can not be empty'),
  body('contact_data.street_number', 'Street number not exists').exists().notEmpty().withMessage('Street number can not be empty'),
  body('contact_data.phone', 'Invalid phone number').matches(/^(([+][3][6])?([0-9]{9}))$/),
  body('contact_data.name', 'Invalid name').matches(/^([A-Z][a-z]*(\s[A-Z][a-z]*){1,3})$/)
];
