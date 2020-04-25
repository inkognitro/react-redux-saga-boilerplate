import {
    ToasterCommandTypes,
    ToasterStateSelector,
} from "Common/Domain/Toaster/Types";
import { takeEvery, call } from "redux-saga/effects";
import { ShowMessage } from "Common/Domain/Toaster/Command/ShowMessage";
import { handleShowMessage } from "Common/Domain/Toaster/Saga/Callables/ShowMessageHandling";

export function createWatchShowMessageFlow(
    toasterStateSelector: ToasterStateSelector,
): () => Generator {
    return function* (): Generator {
        yield takeEvery(ToasterCommandTypes.SHOW_MESSAGE, function* (command: ShowMessage) {
            yield call(handleShowMessage, toasterStateSelector, command);
        });
    };
}
