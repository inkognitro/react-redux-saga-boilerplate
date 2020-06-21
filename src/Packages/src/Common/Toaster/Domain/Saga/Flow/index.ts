import { spawn, takeEvery } from "@redux-saga/core/effects";
import { ToasterSettings, ToasterStateSelector } from "../../Types";
import { handleRemoveMessage } from "./RemoveMessageHandling";
import { handleShowMessage } from "./ShowMessageHandling";
import { ToasterCommandTypes } from "../../Command/Types";

function* watchShowMessageCommands(
    toasterSettings: ToasterSettings,
    toasterStateSelector: ToasterStateSelector,
): Generator {
    yield takeEvery(ToasterCommandTypes.SHOW_MESSAGE, handleShowMessage, toasterSettings, toasterStateSelector);
}

function* watchRemoveMessageCommands(
    toasterSettings: ToasterSettings,
    toasterStateSelector: ToasterStateSelector,
): Generator {
    yield takeEvery(ToasterCommandTypes.REMOVE_MESSAGE, handleRemoveMessage, toasterSettings, toasterStateSelector);
}

export function createToasterSaga(
    toasterSettings: ToasterSettings,
    toasterStateSelector: ToasterStateSelector,
): () => Generator {
    return function* (): Generator {
        yield spawn(watchRemoveMessageCommands, toasterSettings, toasterStateSelector);
        yield spawn(watchShowMessageCommands, toasterSettings, toasterStateSelector);
    };
}
