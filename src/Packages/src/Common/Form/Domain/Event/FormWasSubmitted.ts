import { Event } from "Packages/Entity/CommonTypes";
import { FormState } from "../Types";
import { FormEventTypes } from "./Types";

export function createFormWasSubmitted(form: FormState): FormWasSubmitted {
    return {
        type: FormEventTypes.FORM_WAS_SUBMITTED,
        payload: { form },
    };
}

export type FormWasSubmitted = Event<FormEventTypes.FORM_WAS_SUBMITTED, {
    form: FormState
}>;
