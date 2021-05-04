import dispatcher from '../dispatcher/Dispatcher';
import * as notificationActions from '../dispatcher/NotificatonActionConstants';

const DEFAULT_CLEARING_TIMEOUT = 5000;

const _showErrorMessages = (messages) => {
    dispatcher.dispatch({
        action: notificationActions.showFailure,
        payload: {messages:messages,
            type:'danger'}
    });
    _clearNotification(DEFAULT_CLEARING_TIMEOUT);
};
const _showSuccessMessages = (messages) => {
    dispatcher.dispatch({
        action: notificationActions.showSuccess,
        payload: {messages:messages,
            type:'success'}
    });
    _clearNotification(DEFAULT_CLEARING_TIMEOUT);
};
const _clearNotification = (timeout) => {
    setTimeout(()=>{
        dispatcher.dispatch({
            action: notificationActions.clear
        });
    },timeout);
};
export const showErrorMessages = _showErrorMessages;
export const showSuccessMessages = _showSuccessMessages;
export const clearNotification = _clearNotification;

