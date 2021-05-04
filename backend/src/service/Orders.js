const Order = require('../model/Order');
const Customer = require('../model/Customer');
const OrderState = require('../model/OrderState');
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

const createOrder = async (order) => {
  logger.info(`Creating order ${order}`);
  const exists = await Customer.exists({ _id: order.customer_id });
  return new Promise((resolve, reject) => {
    if (!exists) {
      reject(new Error(`Customer Not Found with id: ${order.customer_id}`));
    } else {
      Order.create({
        ...order,
        status: OrderState.READY,
        notes: []
      })
        .then((documents) => {
          logger.info(`Created order ${documents}`);
          resolve(documents);
        })
        .catch((err) => {
          reject(new Error(`Failed to create order: ${order}, ${err.message}`));
        });
    }
  });
};

const readOrdersByCustomerId = (id) => {
  logger.info(`Reading orders by customerId ${id}`);
  return new Promise((resolve, reject) => {
    Order.find({ customer_id: id })
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to read orders with ID: ${id}, ${err.message}`));
      });
  });
};
const readOrdersByStatus = (status) => {
  logger.info(`Reading orders by status ${status}`);
  const state = OrderState.of(status);
  return new Promise((resolve, reject) => {
    if (state == null) {
      resolve([]);
    }
    Order.find({ status: state })
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to read orders with status: ${state}, ${err.message}`));
      });
  });
};
const updateOrder = (order) => {
  logger.info(`Updating order  ${order}`);
  return new Promise((resolve, reject) => {
    Order.updateOne({ _id: order.id }, {
      cost: order.cost,
      description: order.description,
      contact_data: order.contact_data
    })
      .then((documents) => {
        logger.info(`Updated order  ${documents}`);
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to update order: ${order}, ${err.message}`));
      });
  });
};
const deleteOrderById = (id) => {
  logger.info(`Deleting order with id:   ${id}`);
  return new Promise((resolve, reject) => {
    Order.findByIdAndDelete(id)
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to delete order with ID: ${id}, ${err.message}`));
        reject(err);
      });
  });
};
const addNote = (orderId, note) => {
  logger.info(`Adding note: ${note} to order with id:   ${orderId}`);
  return new Promise((resolve, reject) => {
    Order.updateOne({ _id: orderId, 'notes.name': { $ne: note.name } }, { $push: { notes: note } })
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to add note ${note} to order with ID : ${orderId}, ${err.message}`));
      });
  });
};
const updateNote = async (orderId, noteToUpdate) => {
  logger.info(`Updating note: ${noteToUpdate} in order with id:   ${orderId}`);
  const order = await Order.findById(orderId);
  if (order == null) {
    return new Promise((resolve, reject) => {
      reject(new Error(`Order not found with id:  ${orderId}`));
    });
  }
  if (order.notes.filter(note => note.name === noteToUpdate.name)[0] === undefined) {
    return new Promise((resolve, reject) => {
      reject(new Error(`Note not found with name:  ${noteToUpdate.name} with order id: ${orderId}`));
    });
  }
  const note = order.notes.filter(note => note.name === noteToUpdate.name)[0];
  const newComments = noteToUpdate.comments.filter(comment => comment.id === '0').map(comment => { return { body: comment.body }; });
  logger.debug(`New comments: ${newComments} `);
  return new Promise((resolve, reject) => {
    Order.updateOne({ _id: orderId, 'notes.name': noteToUpdate.name }, {
      $set: {
        'notes.$.comments': createUpdatedComments(note.comments, noteToUpdate.comments).concat(newComments),
        'notes.$.images': noteToUpdate.images
      }
    })
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        logger.error(`Failed to update note:  ${err}`);
        reject(new Error(`Failed to update note: ${noteToUpdate} with order id: ${orderId}, ${err.message}`));
      });
  });
};
const createUpdatedComments = (oldComments, toUpdateComments) => {
  const updatedComments = [];
  for (let i = 0; i < oldComments.length; i++) {
    const updatedComment = toUpdateComments.filter(com => com.id === oldComments[i].id)[0];
    if (updatedComment !== undefined) {
      updatedComments.push({
        _id: oldComments[i].id,
        body: updatedComment.body,
        date: oldComments[i].date
      });
    }
  }
  return updatedComments;
};

const deleteNote = (orderId, noteName) => {
  logger.info(`Deleting note: ${noteName} in order with id:   ${orderId}`);
  return new Promise((resolve, reject) => {
    Order.updateOne({ _id: orderId }, { $pull: { notes: { name: noteName } } })
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to delete note ${noteName} with order ID ${orderId},  ${err}`));
      });
  });
};
const finishNote = (orderId, noteName) => {
  logger.debug(`Finishing note: ${noteName} in order with id:   ${orderId}`);
  return new Promise((resolve, reject) => {
    Order.findOneAndUpdate({ _id: orderId, 'notes.name': noteName, 'notes.finished': null },
      { $set: { 'notes.$.finished': Date.now() } })
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        reject(new Error(`Failed to finish note ${noteName} with order ID ${orderId},  ${err}`));
      });
  });
};
const changeState = async (id, state) => {
  const order = await Order.findById(id);
  return new Promise((resolve, reject) => {
    if (order == null) {
      reject(new Error(`Order not found by id: ${id}`));
    } else {
      if (isStateChangeAllowed(order.status, state)) {
        logger.info(`Changing state from ${order.status} to ${state}, order ID ${id}`);
        Order.updateOne({ _id: id }, { status: state })
          .then((documents) => {
            resolve(documents);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error(`State change not allowed from  ${order.status} to  ${state}`));
      }
    }
  });
};
const changeStateToInUnderProduction = (id) => {
  return changeState(id, OrderState.UNDER_PROD);
};
const changeStateToInFinished = (id) => {
  return changeState(id, OrderState.FINISHED);
};

const isStateChangeAllowed = (from, to) => {
  if (from === OrderState.READY && to === OrderState.UNDER_PROD) return true;
  if (from === OrderState.UNDER_PROD && to === OrderState.FINISHED) return true;
  if (from === OrderState.FINISHED && to === OrderState.UNDER_PROD) return true;
  return false;
};
module.exports = {
  createOrder: createOrder,
  readOrdersByCustomerId: readOrdersByCustomerId,
  readOrdersByStatus: readOrdersByStatus,
  updateOrder: updateOrder,
  deleteOrderById: deleteOrderById,
  addNote: addNote,
  updateNote: updateNote,
  deleteNote: deleteNote,
  changeStateToInUnderProduction: changeStateToInUnderProduction,
  changeStateToInFinished: changeStateToInFinished,
  finishNote: finishNote
};
