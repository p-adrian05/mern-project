const Customer = require('../model/Customer');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/service.log'
    }),
    new winston.transports.Console()
  ]
});

const createCustomer = (customer) => {
  logger.info(`Creating customer ${customer}`);
  return new Promise((resolve, reject) => {
    Customer.create(customer)
      .then((documents) => {
        logger.debug(`Crated customer: ${documents}`);
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to create customer: ${customer}, ${err.message}`));
      });
  });
};
const readCustomerById = (id) => {
  logger.info(`Reading customer by id ${id}`);
  return new Promise((resolve, reject) => {
    Customer.findById(id)
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to read customer id ${id}, ${err.message}`));
      });
  });
};
const readCustomerByEmail = (email) => {
  logger.info(`Reading customer by email ${email}`);
  return new Promise((resolve, reject) => {
    Customer.find({ email: email })
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to read customer with email: ${email}, ${err.message}`));
      });
  });
};
const updateCustomer = (customer) => {
  logger.info(`Updating customer  ${customer}`);
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(customer.id, { name: customer.name, phone: customer.phone })
      .then((documents) => {
        logger.debug(`Updated customer: ${documents}`);
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to update with id: ${customer.id}, ${err.message}`));
      });
  });
};
const deleteCustomerById = (id) => {
  logger.info(`Deleting customer  ${id}`);
  return new Promise((resolve, reject) => {
    Customer.findByIdAndDelete(id)
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to delete customer with id: ${id}, ${err.message}`));
      });
  });
};
module.exports = {
  createCustomer: createCustomer,
  readCustomerById: readCustomerById,
  readCustomerByEmail: readCustomerByEmail,
  updateCustomer: updateCustomer,
  deleteCustomerById: deleteCustomerById
};
