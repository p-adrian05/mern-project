import {describe, it} from "@jest/globals";

jest.dontMock('./Customer');
import  * as actions from './Customer';
import  * as actionsConstants from '../dispatcher/CustomerActionConstans';
jest.mock('axios');
import axios from 'axios';
jest.mock('../dispatcher/Dispatcher');
import dispatcher from "../dispatcher/Dispatcher";

describe('Testing Customer Actions', () => {

    const customer = {
        "_id": "604cef8f5172de349eb924fd",
        "name": "Jonh Doe",
        "email": "test@test.com",
        "phone": "123232332",
        "__v": 0
    };

    const customerToCreate = {
        "name": "Jonh Doe",
        "email": "test@test.com",
        "phone": "123232332",
    };
    const orderId= '604cef8f517de349e2924fd';

    const customer_id = "604cef8f5172de349eb924fd";

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it('fetch customer and dispatch them', async () => {
        // given
        axios.get.mockReturnValue( Promise.resolve({data: customer}));
        const expectedDispatchedEvent = {
            action: actionsConstants.customerDataFetched,
            payload: {...customer,orderId:null}
        };
        // when
        await actions.fetchCustomerData(customer_id);
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toBeCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedDispatchedEvent);
    });

    it('gets error during fetching customer', async () => {
        // given
        axios.get.mockReturnValue(Promise.reject());
        // when
        await actions.fetchCustomerData(customer_id);
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(0);
    });
    it('fetch customer with orderID and dispatch it', async () => {
        // given
        axios.get.mockReturnValue( Promise.resolve({data: customer}));
        const expectedDispatchedEvent = {
            action: actionsConstants.customerDataFetched,
            payload: {...customer,orderId:orderId}
        };
        // when
        await actions.fetchCustomerDataToOrder(customer_id,orderId);
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toBeCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedDispatchedEvent);
    });

    it('login customer and dispatch it', async () => {
        // given
        axios.get.mockReturnValue( Promise.resolve({data: [customer]}));
        const expectedDispatchedEvent = {
            action: actionsConstants.loginCustomer,
            payload: {...customer}
        };
        // when
        await actions.loginCustomer(customer.email);
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toBeCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedDispatchedEvent);
    });

    it('gets error during login customer', async () => {
        // given
        axios.get.mockReturnValue(Promise.reject());
        // when
        await actions.loginCustomer(customer.email);
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(0);
    });

    it('create customer and dispatch it', async () => {
        // given
        axios.post.mockReturnValue( Promise.resolve({data: customer}));
        const expectedDispatchedEvent = {
            action: actionsConstants.loginCustomer,
            payload: {...customer}
        };
        // when
        await actions.createCustomer(customer);
        // then
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toBeCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedDispatchedEvent);
    });

    it('gets error during create customer', async () => {
        // given
        axios.post.mockReturnValue(Promise.reject());
        // when
        await actions.createCustomer(customerToCreate);
        // then
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(0);
    });

});
