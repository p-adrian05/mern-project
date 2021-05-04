const { body } = require('express-validator');

module.exports = [
  body('name', 'Invalid name').matches(/^([A-Z][a-z]*(\s[A-Z][a-z]*){1,3})$/),
  body('email', 'Invalid email').isEmail(),
  body('phone', 'Invalid phone number').matches(/^(([+][3][6])?([0-9]{9}))$/)
];
