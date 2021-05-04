import {EventEmitter} from 'events';
import dispatcher from "../dispatcher/Dispatcher";
import * as actions from '../dispatcher/CustomerActionConstans';

class CustomerStore extends EventEmitter{

    _fetchedCustomerData = null;
    _authenticatedCustomer = null;

    emitChange(){
        this.emit('Change');
    }

    addChangeListener(callback){
        this.addListener('Change',callback);
    }

    removeChangeListener(callback){
        this.removeListener('Change',callback);
    }
}

const store = new CustomerStore();
export default store;

dispatcher.register(({action,payload})=>{
    if(action !== actions.customerDataFetched ) return;
    store._fetchedCustomerData = payload;
    store.emitChange();
});
dispatcher.register(({action,payload})=>{
    if(action !== actions.loginCustomer) return;
    store._authenticatedCustomer = payload;
    store.emitChange();
});
