import React from "react";
import * as actions from '../../action/Orders';
import customerStore from '../../store/CustomerStore';
class OrderRecordingForm extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            cost: 0,
            description: '',
            zipCode: '',
            city: '',
            street: '',
            streetNumber: '',
            phone: '',
            name: '',
            email: 'email@example.com',
            customerId:null
        };
        this.formOnChange = this.formOnChange.bind(this);
    }
    componentDidMount() {
        customerStore.addChangeListener(this._updateStateFromStore);
        if(customerStore._authenticatedCustomer!==null){
            this.initState(customerStore._authenticatedCustomer);
        }
    }

    componentWillUnmount() {
        customerStore.removeChangeListener(this._updateStateFromStore);
    }

    _updateStateFromStore = ()=>{
        if(customerStore._authenticatedCustomer!==null){
            this.initState( customerStore._authenticatedCustomer);
        }
    }
    initState = (customer) =>{
        this.setState({
            cost: 0,
            description: '',
            zipCode: '',
            city: '',
            street: '',
            streetNumber: '',
            phone: customer.phone,
            name: customer.name,
            email: customer.email,
            customerId:customer._id
        });
    }

    formOnChange(event){
        const {name,value} = event.target;
        this.setState({[name] : value});
    }
    submitForm=(event)=>{
        event.preventDefault();
        actions.recordOrder(this.state,this.state.customerId,()=>this.initState(customerStore._authenticatedCustomer));
    }
    render() {
        return(
            <div className={"container"}>
                <form className={"table"}>
                    <h2 className={"p-3 mb-2 mt-4 bg-light"}>Order Recording Form</h2>
                    <div className={"form-group"}>
                      <label htmlFor={"cost"} >Estimated cost</label>
                        <input
                            className={"form-control"}
                            type={"number"}
                            id={"cost"}
                            name={"cost"}
                            value={this.state.cost}
                            onChange={this.formOnChange}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"description"}>Description</label>
                        <textarea
                            className={"form-control"}
                            id={"description"}
                            name={"description"}
                            value={this.state.description}
                            onChange={this.formOnChange}/>
                    </div>
                    <div className={"form-group"}>
                         <label htmlFor={"zipCode"}>Zip Code</label>
                        <input
                            className={"form-control"}
                            type={"number"}
                            id={"zipCode"}
                            name={"zipCode"}
                            value={this.state.zipCode}
                            onChange={this.formOnChange}/>
                    </div >
                    <div className={"form-group"}>
                          <label htmlFor={"city"}>City</label>
                        <input
                            className={"form-control"}
                            type={"text"}
                            id={"city"}
                            name={"city"}
                            value={this.state.city}
                            onChange={this.formOnChange}/>
                    </div>
                    <div className={"form-group"}>
                       <label htmlFor={"street"}>Street</label>
                        <input
                            className={"form-control"}
                            type={"text"}
                            id={"street"}
                            name={"street"}
                            value={this.state.street}
                            onChange={this.formOnChange}/>
                    </div>
                    <div className={"form-group"}>
                       <label htmlFor={"streetNumber"}>Street number</label>
                            <input type={"text"}
                                   className={"form-control"}
                                   id={"streetNumber"}
                                   name={"streetNumber"}
                                   value={this.state.streetNumber}
                                   onChange={this.formOnChange}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"phone"}>Phone number</label>
                            <input
                                type={"text"}
                                className={"form-control"}
                                id={"phone"}
                                name={"phone"}
                                value={this.state.phone}
                                onChange={this.formOnChange}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"name"}>Name</label>
                            <input
                                type={"text"}
                                id={"name"}
                                className={"form-control"}
                                name={"name"}
                                value={this.state.name}
                                onChange={this.formOnChange}/>
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="staticEmail" >Email</label>
                            <input type={"text"} readOnly className={"form-control"} id={"staticEmail"}
                                   value={this.state.email}/>
                    </div>

                    <div className={"form-group"}>
                       <button className={"btn btn-primary"} onClick={this.submitForm}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default OrderRecordingForm;
