jest.mock('../model/Customer');
const Customer = require('../model/Customer');
const service = require('./Customers');

// const each = require('jest-each').default;
const CUSTOMER_CREATION_REQUEST = {
  name: 'John Doe',
  email: 'john@doe.com',
  phone: '+13133113'
};
const CUSTOMER_ID = '5ff6ed85f1c52e5bb6d4a7f9';
const CUSTOMER_EMAIL = 'john@doe.com';
const INVALID_CUSTOMER_ID = '000000000000000000000000';
const CUSTOMER = {
  ...CUSTOMER_CREATION_REQUEST,
  _id: CUSTOMER_ID,
  __v: 0
};
const CUSTOMER_UPDATE_REQUEST = {
  id: CUSTOMER_ID,
  name: 'John Doe',
  email: 'john@doe.com',
  phone: '+13133113'
};
const CUSTOMER_UPDATE_REQUEST_IVALID_ID = {
  ...CUSTOMER_UPDATE_REQUEST,
  id: INVALID_CUSTOMER_ID
};
const CUSTOMER_UPDATE = {
  name: 'John Doe',
  phone: '+13133113'
};
describe('Customer Service Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Test Create Customer', () => {
    Customer.create.mockImplementation(() => Promise.resolve());
    expect.assertions(1);
    service.createCustomer(CUSTOMER_CREATION_REQUEST);
    expect(Customer.create).toHaveBeenCalled();
  });

  it('Test Create Customer with Error', () => {
    Customer.create.mockImplementation(() => Promise.reject(new Error()));
    expect.assertions(1);
    service.createCustomer(CUSTOMER_CREATION_REQUEST);
    expect(Customer.create).toHaveBeenCalled();
  });

  it('find a Customer by ID', () => {
    expect.assertions(2);
    Customer.findById.mockImplementation(() => Promise.resolve(CUSTOMER));
    service.readCustomerById(CUSTOMER_ID).then((customer) => {
      expect(customer).toEqual(CUSTOMER);
    });
    expect(Customer.findById).toHaveBeenCalled();
  });

  it('find a not existing Customer by ID', () => {
    expect.assertions(2);
    Customer.findById.mockImplementation(() => Promise.reject(new Error()));
    service.readCustomerById(INVALID_CUSTOMER_ID).catch(err => {
      expect(err).toBeDefined();
    });
    expect(Customer.findById).toHaveBeenCalled();
  });

  it('find a Customer by email', () => {
    expect.assertions(3);
    Customer.find.mockImplementation((filter) => Promise.resolve(CUSTOMER));
    service.readCustomerByEmail(CUSTOMER_EMAIL).then((customer) => {
      expect(customer).toEqual(CUSTOMER);
    });
    expect(Customer.find).toHaveBeenCalled();
    expect(Customer.find.mock.calls[0][0]).toStrictEqual({ email: CUSTOMER_EMAIL });
  });

  it('find a not existing Customer by email', () => {
    expect.assertions(3);
    Customer.find.mockImplementation((filter) => Promise.reject(new Error()));
    service.readCustomerByEmail(CUSTOMER_EMAIL).catch((err) => {
      expect(err).toBeDefined();
    });
    expect(Customer.find).toHaveBeenCalled();
    expect(Customer.find.mock.calls[0][0]).toStrictEqual({ email: CUSTOMER_EMAIL });
  });
  it('update Customer with existing id', async () => {
    Customer.findByIdAndUpdate.mockImplementation((id, update) => Promise.resolve());
    await service.updateCustomer(CUSTOMER_UPDATE_REQUEST);
    expect.assertions(3);
    expect(Customer.findByIdAndUpdate).toHaveBeenCalled();
    expect(Customer.findByIdAndUpdate.mock.calls[0][0]).toBe(CUSTOMER_ID);
    expect(Customer.findByIdAndUpdate.mock.calls[0][1]).toEqual(CUSTOMER_UPDATE);
  });
  it('update Customer with not existing id', async () => {
    expect.assertions(4);
    Customer.findByIdAndUpdate.mockImplementation((id, update) => Promise.reject(new Error()));
    service.updateCustomer(CUSTOMER_UPDATE_REQUEST_IVALID_ID).catch((err) => {
      expect(err).toBeDefined();
    });
    expect(Customer.findByIdAndUpdate).toHaveBeenCalled();
    expect(Customer.findByIdAndUpdate.mock.calls[0][0]).toBe(INVALID_CUSTOMER_ID);
    expect(Customer.findByIdAndUpdate.mock.calls[0][1]).toEqual(CUSTOMER_UPDATE);
  });
  it('delete a Customer by ID', async () => {
    Customer.findByIdAndDelete.mockImplementation(() => Promise.resolve());
    await service.deleteCustomerById(CUSTOMER_ID);
    expect.assertions(1);
    expect(Customer.findByIdAndDelete).toHaveBeenCalled();
  });

  it('delete a not existing Customer by ID', () => {
    expect.assertions(2);
    Customer.findByIdAndDelete.mockImplementation(() => Promise.reject(new Error()));
    service.deleteCustomerById(INVALID_CUSTOMER_ID).catch(err => {
      expect(err).toBeDefined();
    });
    expect(Customer.findByIdAndDelete).toHaveBeenCalled();
  });
});
