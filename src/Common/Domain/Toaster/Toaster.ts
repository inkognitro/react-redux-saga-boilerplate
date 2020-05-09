import { spawn, takeEvery } from "redux-saga/effects";
import { ToasterCommandTypes, ToasterStateSelector } from "Common/Domain/Toaster/Types";
import { handleShowMessage } from "Common/Domain/Toaster/Saga/ShowMessageHandling";
import { handleRemoveMessage } from "Common/Domain/Toaster/Saga/RemoveMessageHandling";

export function createToasterSaga(
    toasterStateSelector: ToasterStateSelector,
): () => Generator {
    return function* (): Generator {
        yield spawn(watchRemoveMessageCommands, toasterStateSelector);
        yield spawn(watchShowMessageCommands, toasterStateSelector);
    };
}

function* watchShowMessageCommands(toasterStateSelector: ToasterStateSelector): Generator {
    yield takeEvery(ToasterCommandTypes.SHOW_MESSAGE, handleShowMessage, toasterStateSelector);
}

function* watchRemoveMessageCommands(toasterStateSelector: ToasterStateSelector): Generator {
    yield takeEvery(ToasterCommandTypes.REMOVE_MESSAGE, handleRemoveMessage, toasterStateSelector);
}
