import React from "react";
import {NavLink} from "react-router-dom";


const navigationItem = (props) =>{
    return (
        <li className={"nav-item"}>
            <NavLink to={props.link} className={"nav-link"}
                     exact={props.exact}
            >{props.children}</NavLink>
        </li>
);
};

export default navigationItem;
