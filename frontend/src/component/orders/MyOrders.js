import React from "react";
import * as actions from '../../action/Orders';
import OrdersList from "./OrdersList";
import customerStore from "../../store/CustomerStore";

class MyOrders extends React.Component{

    componentDidMount() {
        customerStore.addChangeListener(this._updateStateFromStore);
        this._updateStateFromStore();
    }

    componentWillUnmount() {
        customerStore.removeChangeListener(this._updateStateFromStore);
    }

    _updateStateFromStore = ()=>{
        if(customerStore._authenticatedCustomer!==null){
            actions.fetchOrdersByCustomerId(customerStore._authenticatedCustomer._id);
        }
    }

    render() {
        return(
            <div className={"container"}>
                <h2 className={"p-3 mb-2 mt-4 bg-light"}>My Orders</h2>
                <OrdersList/>
            </div>
        );
    }
}

export default MyOrders;
