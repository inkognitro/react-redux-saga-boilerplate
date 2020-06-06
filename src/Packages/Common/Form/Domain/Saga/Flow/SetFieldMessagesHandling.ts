import { put } from "redux-saga/effects";
import { SetFieldMessages } from "Packages/Common/Form/Domain/Command/SetFieldMessages";
import { FieldMessage } from "Packages/Common/CommonTypes";
import { createFormWasSubmitted } from "../../Event/FormWasSubmitted";

export function* handleSetFieldMessages(command: SetFieldMessages): Generator {
    const formElementsByName = command.payload.form.elementsByName;
    const { fieldMessages } = command.payload;
    for (const fieldName in formElementsByName) {
        const formElement = formElementsByName[fieldName];
        const formElementMessages = findFormElementMessagesByElementName(fieldMessages, fieldName);
        // todo: add messages to form element via command!
        console.info('formElementMessages', formElement, formElementMessages);
    }
    yield put(createFormWasSubmitted(command.payload.form));
}

function findFormElementMessagesByElementName(fieldMessages: FieldMessage[], elementName: string): FieldMessage[] {
    const formElementMessages: FieldMessage[] = [];
    for (const index in fieldMessages) {
        const fieldMessage = fieldMessages[index];
        if (fieldMessage.path.length === 0) {
            continue;
        }
        if (fieldMessage.path[0] === elementName) {
            formElementMessages.push({
                ...fieldMessage,
                path: fieldMessage.path.slice(1),
            });
        }
    }
    return formElementMessages;
}
