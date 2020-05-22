import { FormEventTypes, FormState } from "Packages/Common/Form/Domain/Types";
import {Event} from "Packages/Common/Types";

export function createFormWasSubmitted(form: FormState): FormWasSubmitted {
    return {
        type: FormEventTypes.FORM_WAS_SUBMITTED,
        payload: { form },
    };
}

export type FormWasSubmitted = Event<FormEventTypes.FORM_WAS_SUBMITTED, {
    form: FormState
}>;
