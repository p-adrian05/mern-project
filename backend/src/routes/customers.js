const express = require('express');
const router = express.Router();
const customerController = require('../controller/customers');
const customerCreateRequestDto = require('./dto/customerCreateRequestDto');
const customerUpdateRequestDto = require('./dto/customerUpdateRequestDto');
/**
 * @swagger
 * /customer/{id}:
 *      get:
 *          summary: get customer by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single customer object
 *
 */
router.get('/:id', customerController.readCustomer);

/**
 * @swagger
 * /customer:
 *      get:
 *          summary: get customer by email
 *          parameters:
 *              -   in: query
 *                  name: email
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single customer object
 *
 */
router.get('/', customerController.readCustomer);

/**
 * @swagger
 * /customer:
 *  post:
 *      summary: create a new customer
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 *                      phone:
 *                          type: string
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/', customerCreateRequestDto, customerController.createCustomer);

/**
 * @swagger
 * /customer:
 *  put:
 *      summary: update a customer
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      id:
 *                          type: string
 *                      name:
 *                          type: string
 *                      phone:
 *                          type: string
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.put('/', customerUpdateRequestDto, customerController.updateCustomer);
/**
 * @swagger
 * /customer/{id}:
 *      delete:
 *          summary: delete a customer by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single customer object
 *
 */
router.delete('/:id', customerController.deleteCustomer);
module.exports = router;
