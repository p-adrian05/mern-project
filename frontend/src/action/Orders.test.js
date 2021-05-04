import {describe, it} from "@jest/globals";
import axios from "axios";
import * as actions from "./Orders";
import dispatcher from "../dispatcher/Dispatcher";

jest.dontMock('./Orders');
import  * as actionsConstants from '../dispatcher/OrderActionConstans';
jest.mock('axios');
jest.mock('../dispatcher/Dispatcher');

describe('Testing Orders Actions', () => {

    const CUSTOMER_ID= '604cef8f5172de349eb924fd';

    const ORDER_STATUS = 'ready';
    const RECORD_ORDER = {
        "cost": 50000,
        "description": "string",
        "customer_id": CUSTOMER_ID,
        "contact_data": {
            "zip_code": 12321,
            "city": "Asda",
            "street": "Asds",
            "street_number": "13 A",
            "phone": 705871711 ,
            "name": "John Doe"
        }
    };



    const customerOrders = [
        {
        "contact_data": {
        "zip_code": 2322,
            "city": "Asd",
            "street": "Asd",
            "street_number": "12",
            "phone": "705871712",
            "name": "John Doe"
    },
    "_id": "60758e702e79652af5131be9",
        "cost": 0,
        "description": "string",
        "customer_id": CUSTOMER_ID,
        "status": "ready for production",
        "notes": [
        {
            "finished": null,
            "_id": "607595bb83617b3a06443e2e",
            "name": "sdf",
            "images": [
                {
                    "_id": "607595bb83617b3a06443e2f",
                    "path": "string"
                }
            ],
            "comments": [
                {
                    "_id": "607595bb83617b3a06443e30",
                    "body": "string",
                    "date": "2021-04-13T12:59:39.545Z"
                }
            ],
            "started": "2021-04-13T12:59:39.545Z"
        }
    ],
        "created": "2021-04-13T12:28:32.841Z",
        "__v": 0
},
        {
            "contact_data": {
                "zip_code": 3434,
                "city": "Asd",
                "street": "dfs",
                "street_number": "dfs",
                "phone": "875654532",
                "name": "Jpohn For"
            },
            "_id": "6075b77183617b3a06443e31",
            "cost": 3034,
            "description": "sdf",
            "customer_id":CUSTOMER_ID,
            "status": "ready for production",
            "notes": [],
            "created": "2021-04-13T15:23:29.587Z",
            "__v": 0
        }
    ];
    const orders = [
        {
            "contact_data": {
                "zip_code": 2322,
                "city": "Asd",
                "street": "Asd",
                "street_number": "12",
                "phone": "705871712",
                "name": "John Doe"
            },
            "_id": "60758e702e79652af5131be9",
            "cost": 0,
            "description": "string",
            "customer_id": '60758e702e79652af52131be9',
            "status": "ready for production",
            "notes": [
                {
                    "finished": null,
                    "_id": "607595bb83617b3a06443e2e",
                    "name": "sdf",
                    "images": [
                        {
                            "_id": "607595bb83617b3a06443e2f",
                            "path": "string"
                        }
                    ],
                    "comments": [
                        {
                            "_id": "607595bb83617b3a06443e30",
                            "body": "string",
                            "date": "2021-04-13T12:59:39.545Z"
                        }
                    ],
                    "started": "2021-04-13T12:59:39.545Z"
                }
            ],
            "created": "2021-04-13T12:28:32.841Z",
            "__v": 0
        },
        {
            "contact_data": {
                "zip_code": 3434,
                "city": "Asd",
                "street": "dfs",
                "street_number": "dfs",
                "phone": "875654222",
                "name": "Jpohn Forsds"
            },
            "_id": "6075b77183617b3a06443e31",
            "cost": 3034,
            "description": "sdf",
            "customer_id":'60758e702e796522f5131be9',
            "status": "finished",
            "notes": [],
            "created": "2021-04-13T15:23:29.587Z",
            "__v": 0
        }
    ];
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it('fetches orders by customer ID and dispatch them', async () => {
        // given
        axios.get.mockReturnValue( Promise.resolve({data: customerOrders}));
        const expectedDispatchedEvent = {
            action: actionsConstants.refreshOrders,
            payload: customerOrders
        };
        // when
        await actions.fetchOrdersByCustomerId(CUSTOMER_ID);
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toBeCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedDispatchedEvent);
    });

    it('gets error during fetching orders by customerID', async () => {
        // given
        axios.get.mockReturnValue(Promise.reject());
        // when
        await actions.fetchOrdersByCustomerId(CUSTOMER_ID);
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(0);
    });
    it('fetches orders by status and dispatch them', async () => {
        // given
        axios.get.mockReturnValue( Promise.resolve({data: orders}));
        const expectedDispatchedEvent = {
            action: actionsConstants.refreshOrders,
            payload: orders
        };
        // when
        await actions.fetchOrdersByStatus(ORDER_STATUS);
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toBeCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedDispatchedEvent);
    });

    it('gets error during fetching orders by status', async () => {
        // given
        axios.get.mockReturnValue(Promise.reject());
        // when
        await actions.fetchOrdersByStatus(ORDER_STATUS);
        // then
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(0);
    });
    it('creates a new order successfully', async () => {
        // given
        axios.post.mockReturnValue(Promise.resolve());
        // when
        await actions.recordOrder(RECORD_ORDER);
        // then
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledTimes(1);
    });

    it('creates a new order unsuccessfully', async () => {
        // given
        axios.post.mockReturnValue(Promise.reject(new Error()));
        // when
        await actions.recordOrder(RECORD_ORDER);
        // then
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

});
