import { put } from "redux-saga/effects";
import { Result } from "packages/common/types/util/domain";
import { createShowMessage } from "../command";
import { getToastTypeByMessageType } from "../query";

export function* dispatchToastsFromResult(result: Result): Generator {
    const messages = result.generalMessages;
    if (!messages) {
        return;
    }
    for (const index in messages) {
        const message = messages[index];
        yield put(
            createShowMessage({
                id: message.id,
                toastType: getToastTypeByMessageType(message.type),
                content: message.content,
            }),
        );
    }
}
