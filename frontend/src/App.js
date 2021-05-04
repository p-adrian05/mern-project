import React, {Component} from 'react';
import './App.scss';
import ErrorMessageWell from "./component/ErrorMessageWell";
import OrdersByStatus from "./component/orders/OrdersByStatus";
import NavigationItems from "./component/NavigationItems/NavigationItems";
import {Route} from "react-router-dom";
import OrderRecordingForm from "./component/orders/OrderRecordingForm";
import MyOrders from "./component/orders/MyOrders";
import * as customerActions from './action/Customer';

class App extends Component{

    componentDidMount() {
        customerActions.autoLogin();
    }

    render() {
        return (
            <div className={["App","container"]}>

                <div className={"row"}>
                    <div className={"col-md-3"}/>
                    <div className={"col-md-6"}>
                        <NavigationItems/>
                        <ErrorMessageWell/>
                        <Route path={"/orders"} exact component={OrdersByStatus}/>
                        <Route path={"/myOrders"} exact component={MyOrders}/>
                        <Route path={"/order/create"} exact component={OrderRecordingForm}/>
                    </div>
                    <div className={"col-md-3"}/>
                </div>
            </div>
        );
    }

}

export default App;
