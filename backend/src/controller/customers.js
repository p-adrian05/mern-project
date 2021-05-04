const { validationResult } = require('express-validator');
const service = require('../service/Customers');

exports.createCustomer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createCustomer(req.body).then(customer => res.send(customer)).catch(err => res.status(500).send(err.message));
};
exports.readCustomer = (req, res, next) => {
  if (req.params.id !== undefined) {
    service.readCustomerById(req.params.id)
      .then(customer => res.send(customer === null ? {} : customer))
      .catch(err => res.send({ error: err.message }));
  } else if (req.query.email !== undefined) {
    service.readCustomerByEmail(req.query.email)
      .then(customer => res.send(customer))
      .catch(err => res.send({ error: err.message }));
  }
};
exports.updateCustomer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.updateCustomer(req.body).then(customer => res.send(customer)).catch(err => res.status(500).send(err.message));
};
exports.deleteCustomer = (req, res, next) => {
  service.deleteCustomerById(req.params.id)
    .then(customer => res.send(customer))
    .catch(err => res.send({ error: err.message }));
};
