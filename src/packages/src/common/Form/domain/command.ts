import { Event, FieldMessage } from "packages/entity/common-types";
import { FormState } from "./types";

export enum FormCommandTypes {
    SUBMIT_FORM = 'SUBMIT_FORM-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
    SET_FORM_FIELD_MESSAGES = 'SET_FORM_FIELD_MESSAGES-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
}

export function createSubmitForm(form: FormState): SubmitForm {
    return {
        type: FormCommandTypes.SUBMIT_FORM,
        payload: { form },
    };
}

export type SubmitForm = Event<FormCommandTypes.SUBMIT_FORM, {
    form: FormState
}>;

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
