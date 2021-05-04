const { validationResult } = require('express-validator');
const service = require('../service/Orders');

exports.createOrder = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createOrder(req.body).then(order => res.send(order)).catch(err => res.status(500).send(err.message));
};
exports.readOrders = (req, res, next) => {
  if (req.params.id !== undefined) {
    service.readOrdersByCustomerId(req.params.id)
      .then(order => res.send(order === null ? {} : order))
      .catch(err => res.send({ error: err.message }));
  } else if (req.query.status !== undefined) {
    if (!validationResult(req).isEmpty()) {
      res.status(400).send({ errors: validationResult(req).array() });
      return;
    }
    service.readOrdersByStatus(req.query.status)
      .then(order => res.send(order))
      .catch(err => res.send({ error: err.message }));
  }
};
exports.updateOrder = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.updateOrder(req.body).then(order => res.send(order)).catch(err => res.status(500).send(err.message));
};
exports.deleteOrder = (req, res, next) => {
  service.deleteOrderById(req.params.id)
    .then(order => res.send(order))
    .catch(err => res.send({ error: err.message }));
};
exports.addNote = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.addNote(req.params.id, req.body).then(order => res.send(order)).catch(err => res.status(500).send(err.message));
};
exports.updateNote = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.updateNote(req.params.id, req.body).then(order => res.send(order)).catch(err => res.status(500).send(err.message));
};
exports.deleteNote = (req, res, next) => {
  service.deleteNote(req.params.id, req.params.name).then(order => res.send(order)).catch(err => res.status(500).send(err.message));
};
exports.finishNote = (req, res, next) => {
  service.finishNote(req.params.id, req.params.name).then(order => res.send(order)).catch(err => res.status(500).send(err.message));
};
exports.stateChangeToUnderProduction = (req, res, next) => {
  service.changeStateToInUnderProduction(req.params.id)
    .then(order => res.send(order))
    .catch(err => res.status(500).send({ error: err.message }));
};
exports.stateChangeToFinished = (req, res, next) => {
  service.changeStateToInFinished(req.params.id)
    .then(order => res.send(order))
    .catch(err => res.status(500).send({ error: err.message }));
};
