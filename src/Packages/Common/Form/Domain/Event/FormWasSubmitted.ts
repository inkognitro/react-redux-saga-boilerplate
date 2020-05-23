import { Event } from "Packages/Common/CommonTypes";
import { FormEventTypes, FormState } from "../Types";

export function createFormWasSubmitted(form: FormState): FormWasSubmitted {
    return {
        type: FormEventTypes.FORM_WAS_SUBMITTED,
        payload: { form },
    };
}

export type FormWasSubmitted = Event<FormEventTypes.FORM_WAS_SUBMITTED, {
    form: FormState
}>;
