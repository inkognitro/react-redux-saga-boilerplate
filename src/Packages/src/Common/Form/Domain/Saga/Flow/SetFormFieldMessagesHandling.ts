import { put } from "redux-saga/effects";
import { FieldMessage } from "Packages/Entity/CommonTypes";
import {
    createChangeFormElementStates,
    FormElementState,
    FormElementStateChanges,
    FormElementTypes, TextFieldState,
} from "Packages/Common/FormElement/Domain";
import { SetFormFieldMessages } from "../../Command/SetFormFieldMessages";

export function* handleSetFormFieldMessages(command: SetFormFieldMessages): Generator {
    const formElementsByName = command.payload.form.elementsByName;
    const { fieldMessages } = command.payload;
    const multipleFormElementStateChanges: FormElementStateChanges[] = [];
    for (const fieldName in formElementsByName) {
        const formElement = formElementsByName[fieldName];
        const formElementMessages = findFormElementMessagesByElement(fieldMessages, fieldName);
        const formElementStateChanges = findFormElementChanges(formElement, formElementMessages);
        if (formElementStateChanges === null) {
            continue;
        }
        multipleFormElementStateChanges.push(formElementStateChanges);
    }
    if (multipleFormElementStateChanges.length === 0) {
        return;
    }
    yield put(createChangeFormElementStates(multipleFormElementStateChanges));
}

function findFormElementChanges(
    formElement: FormElementState,
    fieldMessages: FieldMessage[],
): (null | FormElementStateChanges) {
    if (formElement.type === FormElementTypes.TEXT) {
        const stateChanges: Partial<TextFieldState> = {
            messages: fieldMessages.map((fieldMessage) => fieldMessage.message),
        };
        return { formElement, stateChanges };
    }
    if (formElement.type === FormElementTypes.PASSWORD) {
        const stateChanges: Partial<TextFieldState> = {
            messages: fieldMessages.map((fieldMessage) => fieldMessage.message),
        };
        return { formElement, stateChanges };
    }
    if (formElement.type === FormElementTypes.EMAIL) {
        const stateChanges: Partial<TextFieldState> = {
            messages: fieldMessages.map((fieldMessage) => fieldMessage.message),
        };
        return { formElement, stateChanges };
    }
    return null;
}

function findFormElementMessagesByElement(fieldMessages: FieldMessage[], fieldName: string): FieldMessage[] {
    const formElementMessages: FieldMessage[] = [];
    for (const index in fieldMessages) {
        const fieldMessage = fieldMessages[index];
        if (fieldMessage.path.length === 0) {
            continue;
        }
        if (fieldMessage.path[0] === fieldName) {
            formElementMessages.push({
                ...fieldMessage,
                path: fieldMessage.path.slice(1),
            });
        }
    }
    return formElementMessages;
}
