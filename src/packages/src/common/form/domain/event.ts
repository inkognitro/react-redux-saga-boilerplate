import { Event } from "packages/entity/common-types";
import { FormState } from "./types";

export enum FormEventTypes {
    FORM_WAS_SET_TO_RUNNING_REQUEST_MODE = 'FORM_WAS_SET_TO_RUNNING_REQUEST_MODE-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
    FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE = 'FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
    FORM_WAS_SUBMITTED = 'FORM_WAS_SUBMITTED-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
}

export function createFormWasSubmitted(form: FormState): FormWasSubmitted {
    return {
        type: FormEventTypes.FORM_WAS_SUBMITTED,
        payload: { form },
    };
}

export type FormWasSubmitted = Event<FormEventTypes.FORM_WAS_SUBMITTED, {
    form: FormState
}>;

export function createFormWasSetToRunningRequestMode(formId: string): FormWasSetToRunningRequestMode {
    return {
        type: FormEventTypes.FORM_WAS_SET_TO_RUNNING_REQUEST_MODE,
        payload: { formId },
    };
}

export type FormWasSetToRunningRequestMode = Event<FormEventTypes.FORM_WAS_SET_TO_RUNNING_REQUEST_MODE, {
    formId: string
}>;

export function createFormWasSetToNoRunningRequestMode(formId: string): FormWasSetToNoRunningRequestMode {
    return {
        type: FormEventTypes.FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE,
        payload: { formId },
    };
}

export type FormWasSetToNoRunningRequestMode = Event<FormEventTypes.FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE, {
    formId: string
}>;
