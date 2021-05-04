const { body } = require('express-validator');

module.exports = [
  body('name', 'Name not exists').exists(),
  body('images', ' Images array is not exists').exists(),
  body('comments', 'Comments array is not exists').exists()
];
