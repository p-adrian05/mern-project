import React from 'react';
import store from '../store/ErrorMessageStore';

class ErrorMessageWell extends React.Component{

    constructor() {
        super();
        this._errorMsgChange = this._errorMsgChange.bind(this);
    }

    _errorMsgChange(){
        this.setState({errorMsg : store._errorMessages});
    }


    componentDidMount() {
        store.addOnChangeListener(this._errorMsgChange);
    }

    componentWillUnmount() {
        store.removeOnChangeListener(this._errorMsgChange);
    }

    render(){
        let  messages = <div>
            {store._errorMessages.map(msg=>{
                return (
                    <div className={["alert", `alert-${store._errorMessageType}`].join(' ')} key={msg}>
                        {msg}
                    </div>
                );})
            }
        </div>;

        return (
            <React.Fragment>
            {messages}
            </React.Fragment>
        );
    }
}

export default ErrorMessageWell;
