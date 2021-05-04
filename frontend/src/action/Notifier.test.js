import {describe, it} from "@jest/globals";

jest.dontMock('./Notifier');
import  * as actions from './Notifier';
import  * as actionsConstants from '../dispatcher/NotificatonActionConstants';
jest.mock('../dispatcher/Dispatcher');
import dispatcher from "../dispatcher/Dispatcher";
describe('Testing Issues Actions', () => {

    const errorMessages = ['error1','error2'];
    const successMessages = ['succes1','succes2'];

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it('dispatch error messages', async () => {
        // given
        const expectedDispatchedEvent = {
            action: actionsConstants.showFailure,
            payload: {messages: errorMessages,
                    type:'danger'}
        };
        // when
        actions.showErrorMessages(errorMessages);
        // then
        expect(dispatcher.dispatch).toBeCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedDispatchedEvent);
    });

    it('dispatch success messages', async () => {
        // given
        const expectedDispatchedEvent = {
            action: actionsConstants.showSuccess,
            payload: {messages: successMessages,
                type:'success'}
        };
        // when
        actions.showSuccessMessages(successMessages);
        // then
        expect(dispatcher.dispatch).toBeCalledTimes(1);
        expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedDispatchedEvent);
    });

});
