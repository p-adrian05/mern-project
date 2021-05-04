import React from "react";
import CustomerData from "../customer/CustomerData";
import {formatDate} from "../../util/utility";

const order = (props)=>{

    let notes = <td>
        {props.notes.map(note=>{
            return (
                <div key={note._id}>
                    <div><span className={"font-weight-bold"}>Name: </span>{note.name}</div>
                    <div><span className={"font-weight-bold"}>Started: </span>{formatDate(note.started)}</div>
                    <div> <span className={"font-weight-bold"}>{note.finished === null? "Not finished": "Finished"}</span></div>
                    <span className={"font-weight-bold"}>Comments: </span>
                    {
                        note.comments.map(comment=>{
                            return (
                                <div key={comment._id}>
                                <p>{comment.body}</p>
                                <div>{formatDate(comment.date)}</div>
                                    <br/>
                            </div>
                            );
                        })
                    }
                    <div style={{border:"1px solid lightgrey"}}/>
                </div>
            );})
        }
    </td>;

        return(
            <tr key={props.id}>
                <td >{props.id}</td>
                <td>{props.cost}</td>
                <td><p>{props.description}</p></td>
                <td>{props.status}</td>
                <td>{formatDate(props.created)}</td>
                {(props.contactData !== null && props.contactData!== undefined) ?
                    <td>
                        <div><span className={"font-weight-bold"}>Zip Code: </span>{props.contactData.zip_code}</div>
                        <div><span className={"font-weight-bold"}>City: </span>{props.contactData.city}</div>
                        <div><span className={"font-weight-bold"}>Street: </span>{props.contactData.street}</div>
                        <div><span className={"font-weight-bold"}>Number: </span>{props.contactData.street_number}</div>
                        <div><span className={"font-weight-bold"}>Phone: </span>{props.contactData.phone}</div>
                        <div><span className={"font-weight-bold"}>Name: </span>{props.contactData.name}</div>
                    </td> : null
                }
                {notes}
                <td><button  className={"btn btn-primary"} onClick={props.accountInfoClicked}>Account info</button>
                    <CustomerData orderId={props.id}/></td>
            </tr>
        );
};

export default order;
