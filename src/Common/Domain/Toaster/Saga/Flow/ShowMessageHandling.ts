import {
    ToasterCommandTypes,
    ToasterStateSelector,
} from "Common/Domain/Toaster/Types";
import { takeEvery } from "@redux-saga/core/effects";
import { ShowMessage } from "Common/Domain/Toaster/Command/ShowMessage";
import { call } from "redux-saga-test-plan/matchers";
import { handleShowMessage } from "Common/Domain/Toaster/Saga/Callables/ShowMessageHandling";

export function createWatchShowMessageFlow(
    toasterStateSelector: ToasterStateSelector,
): GeneratorFunction {
    function* handle(command: ShowMessage) {
        yield call(handleShowMessage, toasterStateSelector, command);
    }

    return <GeneratorFunction> function* (): Generator {
        yield takeEvery(ToasterCommandTypes.SHOW_MESSAGE, handle);
    };
}
