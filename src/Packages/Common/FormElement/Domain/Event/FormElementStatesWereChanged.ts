import { Event } from "Packages/Common/CommonTypes";
import {
    FormElementEventTypes,
    FormElementStateChanges,
} from "../Types";

export function createFormElementStateWereChanged(
    multipleStateChanges: FormElementStateChanges[],
): FormElementStatesWereChanged {
    return {
        type: FormElementEventTypes.FORM_ELEMENT_STATES_WERE_CHANGED,
        payload: { multipleStateChanges },
    };
}

export type FormElementStatesWereChanged = Event<FormElementEventTypes.FORM_ELEMENT_STATES_WERE_CHANGED, {
    multipleStateChanges: FormElementStateChanges[];
}>;
