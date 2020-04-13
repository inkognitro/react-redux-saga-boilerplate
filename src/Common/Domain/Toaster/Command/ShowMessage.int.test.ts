import {createWatchShowMessageFlow} from "Common/Domain/Toaster/Saga/Flow/ShowMessageHandling";
import {toasterReducer} from "Common/Domain/Toaster/Event/Reducer";
import {createShowMessage} from "Common/Domain/Toaster/Command/ShowMessage";
import {ToastTypes} from "Common/Domain/Toaster/Types";
import {expectSaga} from "redux-saga-test-plan";

test('add an info toast message', () => {
    const handleShowMessage = createWatchShowMessageFlow(state => state, );
    const command = createShowMessage({
        id: '1234',
        toastType: ToastTypes.INFO,
        content: 'foo',
    });
    return expectSaga(handleShowMessage, command)
        .withReducer(toasterReducer)
        .hasFinalState({

        })
        .run();
});