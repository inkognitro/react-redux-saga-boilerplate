import { Event } from "Common/Domain/Bus/Event";
import { FormCommandTypes } from "Common/Domain/Form/Types";

export function createSubmitForm(formId: string): SubmitForm {
    return {
        type: FormCommandTypes.SUBMIT_FORM,
        payload: { formId },
    };
}

export type SubmitForm = Event<FormCommandTypes.SUBMIT_FORM, {
    formState: string
}>;
