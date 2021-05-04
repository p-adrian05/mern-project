const express = require('express');
const router = express.Router();
const orderController = require('../controller/orders');
const customerReadOrdersByStatusRequestDto = require('./dto/customerReadOrdersByStatusRequestDto');
const orderCreateRequestDto = require('./dto/orderCreateRequestDto');
const orderUpdateRequestDto = require('./dto/orderUpdateRequestDto');
const noteCreateRequestDto = require('./dto/noteCreateRequestDto');
/**
 * @swagger
 * /orders/customer/{id}:
 *      get:
 *          summary: get orders by customer id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: orders object
 *
 */
router.get('/customer/:id', orderController.readOrders);

/**
 * @swagger
 * /orders:
 *      get:
 *          summary: get orders by status
 *          parameters:
 *              -   in: query
 *                  name: status
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: orders object
 *
 */
router.get('/', customerReadOrdersByStatusRequestDto, orderController.readOrders);

/**
 * @swagger
 * /orders:
 *  post:
 *      summary: create a new order
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      cost:
 *                          type: integer
 *                      description:
 *                          type: string
 *                      customer_id:
 *                          type: string
 *                      contact_data:
 *                          type: object
 *                          required: true
 *                          properties:
 *                              zip_code:
 *                                type: integer
 *                              city:
 *                                type: string
 *                              street:
 *                                type: string
 *                              street_number:
 *                                type: string
 *                              phone:
 *                                type: integer
 *                              name:
 *                                type: string
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/', orderCreateRequestDto, orderController.createOrder);

/**
 * @swagger
 * /orders:
 *  put:
 *      summary: update an order
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      id:
 *                          type: string
 *                      cost:
 *                          type: integer
 *                      description:
 *                          type: string
 *                      contact_data:
 *                          type: object
 *                          required: true
 *                          properties:
 *                              zip_code:
 *                                type: integer
 *                              city:
 *                                type: string
 *                              street:
 *                                type: string
 *                              street_number:
 *                                type: string
 *                              phone:
 *                                type: integer
 *                              name:
 *                                type: string
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.put('/', orderUpdateRequestDto, orderController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *      delete:
 *          summary: delete an order by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single order object
 *
 */
router.delete('/:id', orderController.deleteOrder);

/**
 * @swagger
 * /orders/{id}/note:
 *  post:
 *      summary: create a new note to an order
 *      parameters:
*              -   in: path
*                  name: id
*                  type: string
*                  required: true
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                      images:
 *                          type: array
 *                          items:
 *                             type: object
 *                             properties:
 *                                path:
 *                                  type: string
 *                      comments:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              body:
 *                                type: string
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/:id/note', noteCreateRequestDto, orderController.addNote);

/**
 * @swagger
 * /orders/{id}/note:
 *  put:
 *      summary: update a note to an order
 *      parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                      images:
 *                          type: array
 *                          items:
 *                             type: object
 *                             properties:
 *                                path:
 *                                  type: string
 *                      comments:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              id:
 *                                type: string
 *                              body:
 *                                type: string
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.put('/:id/note', noteCreateRequestDto, orderController.updateNote);

/**
 * @swagger
 * /orders/{id}/note/{name}:
 *      delete:
 *          summary: delete a note from an order
 *          parameters:
 *              - in: path
 *                name: id
 *                type: string
 *                required: true
 *              - in: path
 *                name: name
 *                type: string
 *                required: true
 *          responses:
 *              200:
 *                  description: a single order object
 *
 */
router.delete('/:id/note/:name', orderController.deleteNote);

/**
 * @swagger
 * /orders/{id}/note/{name}:
 *      patch:
 *          summary: finish a note from an order
 *          parameters:
 *              - in: path
 *                name: id
 *                type: string
 *                required: true
 *              - in: path
 *                name: name
 *                type: string
 *                required: true
 *          responses:
 *              200:
 *                  description: a single order object
 *
 */
router.patch('/:id/note/:name', orderController.finishNote);

/**
 * @swagger
 * /orders/{id}/finish:
 *      patch:
 *          summary: set state of an order to finished
 *          parameters:
 *              - in: path
 *                name: id
 *                type: string
 *                required: true
 *          responses:
 *              200:
 *                  description: a single order object
 *
 */
router.patch('/:id/finish', orderController.stateChangeToFinished);

/**
 * @swagger
 * /orders/{id}/under_prod:
 *      patch:
 *          summary: set state of an order to under production
 *          parameters:
 *              - in: path
 *                name: id
 *                type: string
 *                required: true
 *          responses:
 *              200:
 *                  description: a single order object
 *
 */
router.patch('/:id/under_prod', orderController.stateChangeToUnderProduction);

module.exports = router;
