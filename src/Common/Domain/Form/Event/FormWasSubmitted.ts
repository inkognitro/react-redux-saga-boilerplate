import { Event } from "Common/Domain/Bus/Event";
import { FormEventTypes, FormState } from "Common/Domain/Form/Types";

export function createFormWasSubmitted(form: FormState): FormWasSubmitted {
    return {
        type: FormEventTypes.FORM_WAS_SUBMITTED,
        payload: { form },
    };
}

export type FormWasSubmitted = Event<FormEventTypes.FORM_WAS_SUBMITTED, {
    form: FormState
}>;
