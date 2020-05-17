import { Event } from "Packages/Common/Domain/Bus/Event";
import { FormCommandTypes, FormState } from "Packages/Common/Domain/Form/Types";

export function createSubmitForm(form: FormState): SubmitForm {
    return {
        type: FormCommandTypes.SUBMIT_FORM,
        payload: { form },
    };
}

export type SubmitForm = Event<FormCommandTypes.SUBMIT_FORM, {
    form: FormState
}>;
