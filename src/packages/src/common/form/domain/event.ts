import { Event } from "packages/entity/common-types";
import { FormState } from "./types";

export enum FormEventTypes {
    SUBMIT_HAS_STARTED = 'SUBMIT_HAS_STARTED-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
    SUBMIT_HAS_FINISHED = 'SUBMIT_HAS_FINISHED-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
}

export type FormSubmitHasStarted = Event<FormEventTypes.SUBMIT_HAS_STARTED, { form: FormState }>
export function createFormSubmitHasStarted(form: FormState): FormSubmitHasStarted {
    return {
        type: FormEventTypes.SUBMIT_HAS_STARTED,
        payload: { form },
    };
}

export type FormSubmitHasFinished = Event<FormEventTypes.SUBMIT_HAS_FINISHED, { form: FormState }>
export function createFormSubmitHasFinished(form: FormState): FormSubmitHasFinished {
    return {
        type: FormEventTypes.SUBMIT_HAS_FINISHED,
        payload: { form },
    };
}
