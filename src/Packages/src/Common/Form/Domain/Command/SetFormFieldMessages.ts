import { Event, FieldMessage } from "Packages/Entity/CommonTypes";
import { FormState } from "../Types";
import {FormCommandTypes} from "Packages/Common/Form/Domain/Command/Types";

export function createSetFormFieldMessages(form: FormState, fieldMessages: FieldMessage[]): SetFormFieldMessages {
    return {
        type: FormCommandTypes.SET_FORM_FIELD_MESSAGES,
        payload: { form, fieldMessages },
    };
}

export type SetFormFieldMessages = Event<FormCommandTypes.SET_FORM_FIELD_MESSAGES, {
    form: FormState
    fieldMessages: FieldMessage[]
}>;
