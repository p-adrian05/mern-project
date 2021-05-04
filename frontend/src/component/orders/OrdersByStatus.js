import React from "react";
import {fetchOrdersByStatus} from "../../action/Orders";
import OrdersList from "./OrdersList";


class OrdersByStatus extends React.Component{

    state={
        selectedStatus:"ready"
    }

    componentDidMount() {
        fetchOrdersByStatus(this.state.selectedStatus);
    }
    selectClickedHandler=(event)=>{
        this.setState({selectedStatus: event.target.value});
        fetchOrdersByStatus(event.target.value);
    }
    render() {
        return(
            <div className={"container"}>
                <h3 className={"p-3 mb-2 mt-4 bg-light"}>Orders by status</h3>
                <select id={"statusSelector"} className={"form-control-sm m-3"}
                        value={this.state.selectedStatus}
                        onChange={this.selectClickedHandler}>
                    <option value="ready">Ready for production</option>
                    <option value="underprod">Under production</option>
                    <option value="finished">Finished</option>
                </select>
                <OrdersList/>
            </div>
        );
    }
}

export default OrdersByStatus;
