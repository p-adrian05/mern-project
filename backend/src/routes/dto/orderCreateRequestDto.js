const orderDataDto = require('./orderDataDto.js');
const { body } = require('express-validator');
module.exports = [
  body('customer_id', 'Customer id not exists').exists(),
  orderDataDto
];
