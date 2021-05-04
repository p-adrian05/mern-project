import React from 'react';
import store from '../../store/CustomerStore';
import PropTypes from 'prop-types';
class CustomerData extends React.Component{

    constructor(props) {
        super(props);
        this.state = {data : null};
        this._updateStateFromStore = this._updateStateFromStore.bind(this);
    }

    componentDidMount() {
        store.addChangeListener(this._updateStateFromStore);
    }

    componentWillUnmount() {
        store.removeChangeListener(this._updateStateFromStore);
    }

    _updateStateFromStore(){
        this.setState({data: store._fetchedCustomerData});
    }

    render() {
        let customerData = null;
        if(this.state.data!==null && this.props.orderId === this.state.data.orderId){
            customerData = <React.Fragment>
                <div><span className={"font-weight-bold"}>Email: </span>{this.state.data.email}</div>
                <div><span className={"font-weight-bold"}>Phone: </span>{this.state.data.phone}</div>
                <div><span className={"font-weight-bold"}>Name: </span>{this.state.data.name}</div>
            </React.Fragment>;
        }
        return(
            <div>
                {customerData}
            </div>
        );
    }
}
CustomerData.propTypes = {
    orderId : PropTypes.string
};
export default CustomerData;
