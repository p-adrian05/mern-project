const { body } = require('express-validator');
const orderDataDto = require('./orderDataDto.js');
module.exports = [
  body('id', 'Id not exists').exists(),
  orderDataDto
];
