import axios from 'axios';
import * as notifier from  './Notifier';
import dispatcher from "../dispatcher/Dispatcher";
import * as customerActions from "../dispatcher/CustomerActionConstans";

const test_customer = {
    "name": "John Doe",
    "email": "test@test.com",
    "phone": "101234567"
};

const _fetchCustomerDataToOrder = (customerId,orderId) => {
    axios.get(`/customer/${customerId}`)
        .then((res) =>{
            dispatcher.dispatch({
                action:customerActions.customerDataFetched,
                payload: {...res.data,
                orderId:orderId}
            });
        })
        .catch(err => {
            notifier.showErrorMessages([err.message]);
        });
};
const _fetchCustomerData = (customerId) => {
    _fetchCustomerDataToOrder(customerId,null);
};
const _loginCustomer= (email) => {
    axios.get(`/customer/?email=${email}`)
        .then((res) =>{
            if(res.data.length===0){
                _createCustomer(test_customer);
                return;
            }
            dispatcher.dispatch({
                action:customerActions.loginCustomer,
                payload: {...res.data[0]}
            });
        })
        .catch(err => {
            notifier.showErrorMessages([err.message]);
        });
};
const _createCustomer= (customer) => {
    axios.post(`/customer/`,{
        "name": customer.name,
        "email": customer.email,
        "phone": customer.phone
    })
        .then((res) =>{
            dispatcher.dispatch({
                action:customerActions.loginCustomer,
                payload: {...res.data}
            });
        })
        .catch(err => {
            let messages = [];
            if(err.response.data.errors !== undefined){
                messages = err.response.data.errors.map(error => error.msg);
            }else{
                messages.push(err.message);
            }
            notifier.showErrorMessages(messages);
        });
};

const _autoLogin = ()=>{
    _loginCustomer(test_customer.email);
};
export const fetchCustomerData = _fetchCustomerData;
export const fetchCustomerDataToOrder = _fetchCustomerDataToOrder;
export const autoLogin = _autoLogin;
export const loginCustomer = _loginCustomer;
export const createCustomer = _createCustomer;

