jest.mock('../model/Order');
jest.mock('../model/Customer');

const Order = require('../model/Order');
const Customer = require('../model/Customer');
const OrderState = require('../model/OrderState');
const service = require('./Orders');

const CUSTOMER_ID = '5ff6ed85f1c52e5bb6d4a7f9';
const ORDER_ID = '604df3dde58a0821206f4487';
const INVALID_ORDER_ID = '000000000000000000000000';
const INVALID_CUSTOMER_ID = '00000000000000000000001';
const NOTE_ID = '604df2dde58a0821206f4487';
const COMMENT_ID = '604df1dde58a0821206f4487';
const UPDATED_COMMENTS = [
  {
    _id: COMMENT_ID,
    body: 'old comment',
    date: '2021-03-18T07:48:51.868Z'
  },
  {
    body: 'new comment'
  }
];
const ORDER = {
  _id: ORDER_ID,
  __v: 0,
  cost: 12333,
  created: '2021-03-14T11:30:37.607Z',
  customer_id: CUSTOMER_ID,
  description: 'desc',
  notes: [
    {
      finished: '2021-03-18T07:44:47.239Z',
      _id: NOTE_ID,
      name: 'name',
      images: [
        {
          _id: '605305e301005b102e75d88d',
          path: 'string'
        }
      ],
      comments: [
        {
          id: COMMENT_ID,
          body: 'old comment',
          date: '2021-03-18T07:48:51.868Z'
        }
      ],
      started: '2021-03-18T07:43:07.043Z'
    }
  ],
  status: OrderState.READY
};
const CREATE_ORDER_REQUEST = {
  cost: 12333,
  customer_id: CUSTOMER_ID,
  description: 'desc'
};
const NOTE_TO_UPDATE = {
  name: 'name',
  images: [],
  comments: [
    {
      id: COMMENT_ID,
      body: 'old comment'
    },
    {
      id: '0',
      body: 'new comment'
    }
  ]
};
const NOTE_TO_UPDATE_INVALID = {
  name: 'name1',
  images: [],
  comments: [
    {
      id: COMMENT_ID,
      body: 'old comment'
    },
    {
      id: '0',
      body: 'new comment'
    }
  ]
};
const CREATE_ORDER_REQUEST_INVALID_CUSTOMER = {
  cost: 12333,
  customer_id: INVALID_CUSTOMER_ID,
  description: 'desc'
};
const ORDER_UNDER_PROD = {
  ...Order,
  _id: '604df3cae58a0821206f4486',
  status: OrderState.UNDER_PROD
};
const ORDER_FINISHED = {
  ...Order,
  _id: '604df3cae58a0821206f4481',
  status: OrderState.FINISHED
};
const ORDERS = [ORDER, ORDER];

const ORDER_UPDATE_REQUEST = {
  cost: 12333,
  description: 'desc',
  id: ORDER_ID
};
const ORDER_UPDATE = {
  cost: ORDER_UPDATE_REQUEST.cost,
  description: ORDER_UPDATE_REQUEST.description
};
const ORDER_UPDATE_REQUEST_IVALID_ID = {
  ...ORDER_UPDATE_REQUEST,
  id: INVALID_ORDER_ID
};
const NOTE = {
  name: 'name',
  started: Date.now(),
  finished: null,
  comments: [{ body: 'body', date: Date.now() }],
  images: []
};
const ADD_NOTE_FILTER = {
  _id: ORDER_ID,
  'notes.name': { $ne: NOTE.name }
};
const ADD_NOTE_FILTER_INVALID_ORDER = {
  _id: INVALID_ORDER_ID,
  'notes.name': { $ne: NOTE.name }
};
const UPDATE_NOTE_FILTER = {
  _id: ORDER_ID,
  'notes.name': NOTE.name
};
const UPDATE_NOTE_FILTER_INVALID_ORDER_ID = {
  _id: INVALID_ORDER_ID,
  'notes.name': NOTE.name
};
const FINISH_NOTE_FILTER = {
  ...UPDATE_NOTE_FILTER,
  'notes.finished': null
};
const FINISH_NOTE_FILTER_INVALID_ORDER_ID = {
  ...UPDATE_NOTE_FILTER_INVALID_ORDER_ID,
  'notes.finished': null
};
describe('Customer Service Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('create order with existing customer id', async () => {
    Customer.exists.mockImplementation((filter) => Promise.resolve(true));
    Order.create.mockImplementation((order) => Promise.resolve());
    await service.createOrder(CREATE_ORDER_REQUEST);
    expect.assertions(4);
    expect(Customer.exists).toHaveBeenCalled();
    expect(Customer.exists.mock.calls[0][0]).toEqual({ _id: CREATE_ORDER_REQUEST.customer_id });
    expect(Order.create).toHaveBeenCalled();
    expect(Order.create.mock.calls[0][0]).toEqual({
      ...CREATE_ORDER_REQUEST,
      status: OrderState.READY,
      notes: []
    });
  });
  it('create order with non existent customer id', async () => {
    expect.assertions(4);
    Customer.exists.mockImplementation((filter) => Promise.resolve(false));
    Order.create.mockImplementation((order) => Promise.resolve());
    service.createOrder(CREATE_ORDER_REQUEST_INVALID_CUSTOMER).catch(err => {
      expect(err).toBeDefined();
    });
    expect(Customer.exists).toHaveBeenCalled();
    expect(Customer.exists.mock.calls[0][0]).toEqual({ _id: CREATE_ORDER_REQUEST_INVALID_CUSTOMER.customer_id });
    expect(Order.create).not.toHaveBeenCalled();
  });
  it('fail to create order with existing customer id', async () => {
    Customer.exists.mockImplementation((filter) => Promise.resolve(true));
    Order.create.mockImplementation((order) => Promise.reject(new Error()));
    await service.createOrder(CREATE_ORDER_REQUEST).catch(err => {
      expect(err).toBeDefined();
    });
    expect(Customer.exists).toHaveBeenCalled();
    expect(Customer.exists.mock.calls[0][0]).toEqual({ _id: CREATE_ORDER_REQUEST.customer_id });
    expect(Order.create).toHaveBeenCalled();
    expect(Order.create.mock.calls[0][0]).toEqual({
      ...CREATE_ORDER_REQUEST,
      status: OrderState.READY,
      notes: []
    });
  });
  it('find orders by customer ID', () => {
    expect.assertions(3);
    Order.find.mockImplementation((filter) => Promise.resolve(ORDERS));
    service.readOrdersByCustomerId(CUSTOMER_ID).then((orders) => {
      expect(orders).toEqual(ORDERS);
    });
    expect(Order.find).toHaveBeenCalled();
    expect(Order.find.mock.calls[0][0]).toStrictEqual({ customer_id: CUSTOMER_ID });
  });

  it('find orders by not existent customer ID', () => {
    expect.assertions(3);
    Order.find.mockImplementation((filter) => Promise.reject(new Error()));
    service.readOrdersByCustomerId(CUSTOMER_ID).catch((err) => {
      expect(err).toBeDefined();
    });
    expect(Order.find).toHaveBeenCalled();
    expect(Order.find.mock.calls[0][0]).toStrictEqual({ customer_id: CUSTOMER_ID });
  });
  it('find orders by status', () => {
    expect.assertions(3);
    Order.find.mockImplementation((filter) => Promise.resolve(ORDERS));
    service.readOrdersByStatus(OrderState.READY).then((orders) => {
      expect(orders).toEqual(ORDERS);
    });
    expect(Order.find).toHaveBeenCalled();
    expect(Order.find.mock.calls[0][0]).toStrictEqual({ status: OrderState.READY });
  });

  it('find orders by not valid status', () => {
    expect.assertions(3);
    Order.find.mockImplementation((filter) => Promise.reject(new Error()));
    service.readOrdersByStatus('Ready').catch((err) => {
      expect(err).toBeDefined();
    });
    expect(Order.find).toHaveBeenCalled();
    expect(Order.find.mock.calls[0][0]).toStrictEqual({ status: OrderState.READY });
  });

  it('update Order with existing id', async () => {
    Order.updateOne.mockImplementation((id, update) => Promise.resolve());
    await service.updateOrder(ORDER_UPDATE_REQUEST);
    expect.assertions(3);
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toEqual({ _id: ORDER_ID });
    expect(Order.updateOne.mock.calls[0][1]).toEqual(ORDER_UPDATE);
  });
  it('update Order with not existent id', async () => {
    expect.assertions(4);
    Order.updateOne.mockImplementation((id, update) => Promise.reject(new Error()));
    service.updateOrder(ORDER_UPDATE_REQUEST_IVALID_ID).catch((err) => {
      expect(err).toBeDefined();
    });
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toEqual({ _id: INVALID_ORDER_ID });
    expect(Order.updateOne.mock.calls[0][1]).toEqual(ORDER_UPDATE);
  });

  it('delete an Order by ID', async () => {
    Order.findByIdAndDelete.mockImplementation(() => Promise.resolve());
    await service.deleteOrderById(ORDER_ID);
    expect.assertions(1);
    expect(Order.findByIdAndDelete).toHaveBeenCalled();
  });

  it('delete a non existent Order by ID', () => {
    expect.assertions(2);
    Order.findByIdAndDelete.mockImplementation(() => Promise.reject(new Error()));
    service.deleteOrderById(INVALID_ORDER_ID).catch(err => {
      expect(err).toBeDefined();
    });
    expect(Order.findByIdAndDelete).toHaveBeenCalled();
  });

  it('add a note to an existing Order ', async () => {
    Order.updateOne.mockImplementation((filter, update) => Promise.resolve());
    await service.addNote(ORDER_ID, NOTE);
    expect.assertions(3);
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toStrictEqual(ADD_NOTE_FILTER);
    expect(Order.updateOne.mock.calls[0][1]).toStrictEqual({ $push: { notes: NOTE } });
  });

  it('add a note to a non existent Order', () => {
    Order.create.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(4);
    service.addNote(INVALID_ORDER_ID, NOTE).catch(err => {
      expect(err).toBeDefined();
    });
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toStrictEqual(ADD_NOTE_FILTER_INVALID_ORDER);
    expect(Order.updateOne.mock.calls[0][1]).toStrictEqual({ $push: { notes: NOTE } });
  });
  it('update Note with existing Order ID', async () => {
    Order.updateOne.mockImplementation((filter, update) => Promise.resolve());
    Order.findById.mockImplementation(() => Promise.resolve(ORDER));
    await service.updateNote(ORDER_ID, NOTE_TO_UPDATE);
    expect.assertions(4);
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.findById).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toEqual(UPDATE_NOTE_FILTER);
    expect(Order.updateOne.mock.calls[0][1]).toEqual({
      $set: {
        'notes.$.comments': UPDATED_COMMENTS,
        'notes.$.images': NOTE_TO_UPDATE.images
      }
    });
  });

  it('update Note with non existent Order ID', () => {
    expect.assertions(2);
    Order.updateOne.mockImplementation((filter, update) => Promise.reject(new Error()));
    service.updateNote(INVALID_ORDER_ID, NOTE_TO_UPDATE).catch((err) => {
      expect(err).toBeDefined();
    });
    expect(Order.updateOne).not.toHaveBeenCalled();
  });

  it('update Note with non existent note', () => {
    expect.assertions(3);
    Order.findById.mockImplementation((filter, update) => Promise.resolve(ORDER));
    service.updateNote(ORDER_ID, NOTE_TO_UPDATE_INVALID).catch((err) => {
      expect(err).toBeDefined();
    });
    expect(Order.updateOne).not.toHaveBeenCalled();
    expect(Order.findById).toHaveBeenCalled();
  });
  it('delete a note for an existing Order', async () => {
    Order.updateOne.mockImplementation((filter, update) => Promise.resolve());
    await service.deleteNote(ORDER_ID, NOTE.name);
    expect.assertions(3);
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toEqual({ _id: ORDER_ID });
    expect(Order.updateOne.mock.calls[0][1]).toEqual({ $pull: { notes: { name: NOTE.name } } });
  });

  it('delete a note for an non existent Order', () => {
    expect.assertions(4);
    Order.updateOne.mockImplementation((filter, update) => Promise.reject(new Error()));
    service.deleteNote(INVALID_ORDER_ID, NOTE.name).catch(err => {
      expect(err).toBeDefined();
    });
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toEqual({ _id: INVALID_ORDER_ID });
    expect(Order.updateOne.mock.calls[0][1]).toEqual({ $pull: { notes: { name: NOTE.name } } });
  });
  it('finish Note with existing Order ID', async () => {
    Order.findOneAndUpdate.mockImplementation((filter, update) => Promise.resolve());
    await service.finishNote(ORDER_ID, NOTE.name);
    expect.assertions(2);
    expect(Order.findOneAndUpdate).toHaveBeenCalled();
    expect(Order.findOneAndUpdate.mock.calls[0][0]).toEqual(FINISH_NOTE_FILTER);
  });

  it('finish Note with non existent Order ID', () => {
    expect.assertions(3);
    Order.findOneAndUpdate.mockImplementation((filter, update) => Promise.reject(new Error()));
    service.finishNote(INVALID_ORDER_ID, NOTE.name).catch((err) => {
      expect(err).toBeDefined();
    });
    expect(Order.findOneAndUpdate).toHaveBeenCalled();
    expect(Order.findOneAndUpdate.mock.calls[0][0]).toEqual(FINISH_NOTE_FILTER_INVALID_ORDER_ID);
  });

  it('change an order from READY to in UNDER_PROD', async () => {
    // given
    Order.findById.mockImplementation((id) => Promise.resolve(ORDER));
    Order.updateOne.mockImplementation((id, update) => Promise.resolve());
    // when
    await service.changeStateToInUnderProduction(ORDER_ID);
    // then
    expect.assertions(5);
    expect(Order.findById).toHaveBeenCalled();
    expect(Order.findById.mock.calls[0][0]).toBe(ORDER_ID);
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toEqual({ _id: ORDER_ID });
    expect(Order.updateOne.mock.calls[0][1]).toEqual({ status: OrderState.UNDER_PROD });
  });
  it('change an order from UNDER_PROD to in FINISHED', async () => {
    // given
    Order.findById.mockImplementation((id) => Promise.resolve(ORDER_UNDER_PROD));
    Order.updateOne.mockImplementation((id, update) => Promise.resolve());
    // when
    await service.changeStateToInFinished(ORDER_UNDER_PROD._id);
    // then
    expect.assertions(5);
    expect(Order.findById).toHaveBeenCalled();
    expect(Order.findById.mock.calls[0][0]).toBe(ORDER_UNDER_PROD._id);
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toEqual({ _id: ORDER_UNDER_PROD._id });
    expect(Order.updateOne.mock.calls[0][1]).toEqual({ status: OrderState.FINISHED });
  });
  it('change an order from FINISHED to in UNDER_PROD', async () => {
    // given
    Order.findById.mockImplementation((id) => Promise.resolve(ORDER_FINISHED));
    Order.updateOne.mockImplementation((id, update) => Promise.resolve());
    // when
    await service.changeStateToInUnderProduction(ORDER_FINISHED._id);
    // then
    expect.assertions(5);
    expect(Order.findById).toHaveBeenCalled();
    expect(Order.findById.mock.calls[0][0]).toBe(ORDER_FINISHED._id);
    expect(Order.updateOne).toHaveBeenCalled();
    expect(Order.updateOne.mock.calls[0][0]).toEqual({ _id: ORDER_FINISHED._id });
    expect(Order.updateOne.mock.calls[0][1]).toEqual({ status: OrderState.UNDER_PROD });
  });

  it('change an order from READY to in FINISHED', async () => {
    expect.assertions(4);
    Order.findById.mockImplementation((id) => Promise.resolve(ORDER));
    service.changeStateToInFinished(ORDER._id).catch(err => {
      expect(err).toBeDefined();
    });
    expect(Order.findById).toHaveBeenCalled();
    expect(Order.findById.mock.calls[0][0]).toBe(ORDER._id);
    expect(Order.updateOne).not.toHaveBeenCalled();
  });
});
