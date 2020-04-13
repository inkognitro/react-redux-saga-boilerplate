/*
import {createWatchShowMessageFlow} from "../../../../src/Common/Domain/Toaster/Saga/Flow/ShowMessageHandling";
import {toasterReducer} from "../../../../src/Common/Domain/Toaster/Event/Reducer";
import {createShowMessage} from "../../../../src/Common/Domain/Toaster/Command/ShowMessage";
import {ToastTypes} from "../../../../src/Common/Domain/Toaster/Types";
import {expectSaga} from "redux-saga-tests-plan";

tests('add an info toast message', () => {
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
*/
function sum(one: number, two: number) {
    return (one + two);
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});