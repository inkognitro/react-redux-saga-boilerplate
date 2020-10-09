import { put } from 'redux-saga/effects';
import { FieldMessage, FieldMessagePath, Message } from "packages/common/types/util/domain";
import { createFormElementStatesWereChanged } from "../event";
import {
    getMessagesByPathFromFieldMessages,
    getPathFormElementsToConsiderForMessages,
} from "../query";
import { FormElementState, FormElementStateChanges, FormElementTypes } from "../types";

const directlyIncludedMessagesFormElementTypes = [
    FormElementTypes.TEXT,
    FormElementTypes.PASSWORD,
    FormElementTypes.EMAIL,
    FormElementTypes.CHECKBOX,
];

function findMessagesFormElementStateChanges(
    formElement: FormElementState,
    messages: Message[],
): (null | FormElementStateChanges) {
    if (directlyIncludedMessagesFormElementTypes.includes(formElement.type)) {
        return (messages.length === 0 && formElement.messages.length === 0 ? null : {
            formElement,
            stateChanges: {
                messages,
            },
        });
    }
    throw new Error(`Form element type "${formElement.type}" not supported!`);
}

type SetFormElementMessagesSettings = {
    state: any
    fieldMessages: FieldMessage[]
    fieldMessagesPrefixPath?: FieldMessagePath
}

export function* setFormElementMessages(settings: SetFormElementMessagesSettings): Generator {
    const fieldMessagesPrefixPath = (settings.fieldMessagesPrefixPath ? settings.fieldMessagesPrefixPath : []);
    const pathFormElements = getPathFormElementsToConsiderForMessages({
        state: settings.state,
        fieldMessagesPrefixPath,
    });
    const multipleStateChanges: FormElementStateChanges[] = [];
    for (const index in pathFormElements) {
        const pathFormElement = pathFormElements[index];
        const messages = getMessagesByPathFromFieldMessages(pathFormElement.path, settings.fieldMessages);
        const formElementStateChanges = findMessagesFormElementStateChanges(pathFormElement.formElement, messages);
        if (!formElementStateChanges) {
            continue;
        }
        multipleStateChanges.push(formElementStateChanges);
    }
    if (multipleStateChanges.length === 0) {
        return;
    }
    yield put(createFormElementStatesWereChanged(multipleStateChanges));
}
