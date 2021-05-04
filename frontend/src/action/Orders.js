import axios from 'axios';
import * as notifier from  './Notifier';
import dispatcher from "../dispatcher/Dispatcher";
import * as orderActions from "../dispatcher/OrderActionConstans";


const _recordOrder = (formData,customerId,callback) => {
    axios.post('/orders', {
        cost: formData.cost,
        description:  formData.description,
        customer_id:customerId,
        contact_data:{
            zip_code: formData.zipCode,
            city: formData.city,
            street: formData.street,
            street_number: formData.streetNumber,
            phone: formData.phone,
            name: formData.name,
        }

    })
        .then(() =>{
            notifier.showSuccessMessages(['Order recorded']);
            callback();
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

const _fetchOrdersByCustomerId = (customerId) => {
    axios.get(`/orders/customer/${customerId}`)
        .then((res) =>{
            dispatcher.dispatch({
                action: orderActions.refreshOrders,
                payload: res.data
            });
        })
        .catch(err => {
            notifier.showErrorMessages(err.message);
        });
};
const _fetchOrdersByStatus = (status) => {
    axios.get(`/orders/?status=${status}`)
        .then((res) =>{
            dispatcher.dispatch({
                action: orderActions.refreshOrders,
                payload: res.data
            });
        })
        .catch(err => {
            notifier.showErrorMessages(err.message);
        });
};
export const recordOrder = _recordOrder;
export const fetchOrdersByCustomerId = _fetchOrdersByCustomerId;
export const fetchOrdersByStatus = _fetchOrdersByStatus;

