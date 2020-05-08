import { Event } from "Common/Domain/Bus/Event";
import {
    FormElementEventTypes,
    MultipleFormElementStateChanges
} from "Common/Domain/FormUtils/FormElements/Types";

export function createFormElementStateWereChanged(
    multipleStateChanges: MultipleFormElementStateChanges,
): FormElementStatesWereChanged {
    return {
        type: FormElementEventTypes.FORM_ELEMENT_STATES_WERE_CHANGED,
        payload: { multipleStateChanges },
    };
}

export type FormElementStatesWereChanged = Event<FormElementEventTypes.FORM_ELEMENT_STATES_WERE_CHANGED, {
    multipleStateChanges: MultipleFormElementStateChanges;
}>;
