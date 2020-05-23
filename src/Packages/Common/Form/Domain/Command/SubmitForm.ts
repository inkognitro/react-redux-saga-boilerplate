import { FormCommandTypes, FormState } from "Packages/Common/Form/Domain/Types";
import {Event} from "Packages/Common/CommonTypes";

export function createSubmitForm(form: FormState): SubmitForm {
    return {
        type: FormCommandTypes.SUBMIT_FORM,
        payload: { form },
    };
}

export type SubmitForm = Event<FormCommandTypes.SUBMIT_FORM, {
    form: FormState
}>;
