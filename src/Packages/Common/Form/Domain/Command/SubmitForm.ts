import { Event } from "Packages/Entity/CommonTypes";
import { FormCommandTypes, FormState } from "../Types";

export function createSubmitForm(form: FormState): SubmitForm {
    return {
        type: FormCommandTypes.SUBMIT_FORM,
        payload: { form },
    };
}

export type SubmitForm = Event<FormCommandTypes.SUBMIT_FORM, {
    form: FormState
}>;
