import React from 'react';
import store from '../../store/OrderStore';
import Order from "./Order";
import * as actions from '../../action/Customer';

class OrdersList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {orders : []};
        this._updateStateFromStore = this._updateStateFromStore.bind(this);
    }

    componentDidMount() {
        store.addChangeListener(this._updateStateFromStore);
    }

    componentWillUnmount() {
        store.removeChangeListener(this._updateStateFromStore);
    }

    _updateStateFromStore(){
        this.setState({orders: store._orders});
    }

    accountInfoClickedHandler = (customerId,orderId)=>{
        actions.fetchCustomerDataToOrder(customerId,orderId);
}

    render() {
        return(
            <div>
                <table className={"table table-striped container"} style={{width:"1400px"}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cost</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Contact Info</th>
                        <th>Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.orders.map((order) => {
                            return (
                                <Order
                                    key={order._id}
                                    id={order._id}
                                    cost={order.cost}
                                    description={order.description}
                                    status={order.status}
                                    created={order.created}
                                    contactData={order.contact_data}
                                    accountInfoClicked={()=>this.accountInfoClickedHandler(order.customer_id,order._id)}
                                    notes={order.notes}
                                />
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OrdersList;
