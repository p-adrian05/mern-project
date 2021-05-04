
const { query, oneOf } = require('express-validator');

module.exports = [
  oneOf([
    query('status', 'Invalid status').equals('ready'),
    query('status', 'Invalid status').equals('finished'),
    query('status', 'Invalid status').equals('underprod')
  ], 'Status must be ready, finished or underprod')
];
