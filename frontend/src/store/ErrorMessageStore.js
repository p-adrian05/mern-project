import {EventEmitter} from 'events';
import  dispatcher from '../dispatcher/Dispatcher';
import * as actionConstants from '../dispatcher/NotificatonActionConstants';

class ErrorMessageStore extends EventEmitter{

    _errorMessages = [];
    _errorMessageType = 'danger';

    emitChange(){
        this.emit('Change');
    }

    addOnChangeListener(callback){
        this.addListener('Change', callback);
    }

    removeOnChangeListener(callback){
        this.removeListener('Change',callback);
    }
}
const store = new ErrorMessageStore();
export default store;

dispatcher.register(({action,payload})=>{
    if(action !== actionConstants.showFailure){
        return;
    }
    store._errorMessages = payload.messages;
    store._errorMessageType = payload.type;
    store.emitChange();
});
dispatcher.register(({action,payload})=>{
    if(action !== actionConstants.showSuccess){
        return;
    }
    store._errorMessages = payload.messages;
    store._errorMessageType = payload.type;
    store.emitChange();
});
dispatcher.register(({action})=>{
    if(action !== actionConstants.clear){
        return;
    }
    store._errorMessages = [];
    store.emitChange();
});
