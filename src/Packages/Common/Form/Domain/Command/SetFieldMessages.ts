import { Event, FieldMessage } from "Packages/Common/CommonTypes";
import { FormCommandTypes, FormState } from "../Types";

export function createSetFieldMessages(form: FormState, fieldMessages: FieldMessage[]): SetFieldMessages {
    return {
        type: FormCommandTypes.SET_FIELD_MESSAGES,
        payload: { form, fieldMessages },
    };
}

export type SetFieldMessages = Event<FormCommandTypes.SET_FIELD_MESSAGES, {
    form: FormState
    fieldMessages: FieldMessage[]
}>;
