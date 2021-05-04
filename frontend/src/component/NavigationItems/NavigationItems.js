import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import {Component} from "react/cjs/react.production.min";
class NavigationItems extends Component{

render(){
    return (
    <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
        <a className={"navbar-brand"} href="#">Watch maker</a>
        <div className={"collapse navbar-collapse"} id={"navbarNav"}>
            <ul className={"navbar-nav"}>
                <NavigationItem link="/order/create">Create order</NavigationItem>
                <NavigationItem link="/orders">Orders by status</NavigationItem>
                <NavigationItem link="/myOrders">My Orders</NavigationItem>
            </ul>
        </div>
    </nav>
    );
}
}

export default NavigationItems;
