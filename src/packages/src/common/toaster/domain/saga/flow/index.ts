import { spawn, takeEvery } from 'redux-saga/effects';
import { ToasterSettings, ToasterStateSelector } from '../../types';
import { handleRemoveMessage } from './remove.message.handling';
import { handleShowMessage } from './show.message.handling';
import { ToasterCommandTypes } from '../../command';

function* watchShowMessageCommands(
    toasterSettings: ToasterSettings,
    toasterStateSelector: ToasterStateSelector
): Generator {
    yield takeEvery(ToasterCommandTypes.SHOW_MESSAGE, handleShowMessage, toasterSettings, toasterStateSelector);
}

function* watchRemoveMessageCommands(
    toasterSettings: ToasterSettings,
    toasterStateSelector: ToasterStateSelector
): Generator {
    yield takeEvery(ToasterCommandTypes.REMOVE_MESSAGE, handleRemoveMessage, toasterSettings, toasterStateSelector);
}

export function createToasterSaga(
    toasterSettings: ToasterSettings,
    toasterStateSelector: ToasterStateSelector
): () => Generator {
    return function* (): Generator {
        yield spawn(watchRemoveMessageCommands, toasterSettings, toasterStateSelector);
        yield spawn(watchShowMessageCommands, toasterSettings, toasterStateSelector);
    };
}
