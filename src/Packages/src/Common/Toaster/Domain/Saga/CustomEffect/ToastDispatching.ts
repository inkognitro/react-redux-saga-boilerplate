import {
    call, CallEffect, put, StrictEffect,
} from "redux-saga/effects";
import { Result } from "Packages/Entity/CommonTypes";
import { createShowMessage } from "Packages/Common/Toaster";
import { getToastTypeByMessageType } from "Packages/Common/Toaster/Domain/Query/ToastTypeQuery";

export type DispatchToastsFromResultGenerator = Generator<StrictEffect, void>;

function* internalDispatchToastsFromResult(result: Result): DispatchToastsFromResultGenerator {
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

type DispatchToastsFromResultCallEffect = CallEffect<{
    context: any
    fn: DispatchToastsFromResultGenerator
    args: any[]
}>

export function dispatchToastsFromResult(result: Result): DispatchToastsFromResultCallEffect {
    // @ts-ignore
    return call(internalDispatchToastsFromResult, result);
}
