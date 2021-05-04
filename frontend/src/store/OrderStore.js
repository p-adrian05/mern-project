import {EventEmitter} from 'events';
import dispatcher from "../dispatcher/Dispatcher";
import * as actions from '../dispatcher/OrderActionConstans';

class OrderStore extends EventEmitter{

    _orders = [];

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

const store = new OrderStore();
export default store;

dispatcher.register(({action,payload})=>{
    if(action !== actions.refreshOrders) return;
    store._orders = payload;
    store.emitChange();
});
