const { body } = require('express-validator');

module.exports = [
  body('id', 'Id does not exists').exists(),
  body('phone', 'Invalid phone number').matches(/^(([+][3][6])?([0-9]{9}))$/),
  body('name', 'Invalid name').matches(/^([A-Z][a-z]*(\s[A-Z][a-z]*){1,3})$/)
];
