import { Reducer } from "redux";
import { CheckboxState } from "../types";
import { internalFormElementReducer } from "./internal.form.element.reducer";
import { createCheckboxState } from "../form.element.state.factory";
import { FormElementStatesWereChanged, FormElementStateWasChanged } from "../event";

type FormElementEvent = (FormElementStateWasChanged | FormElementStatesWereChanged)
type PartialInitialState = Partial<Omit<CheckboxState, "type">>

export const checkboxReducer = createCheckboxReducer();

export function createCheckboxReducer(partialInitialState: PartialInitialState = {}): Reducer<CheckboxState> {
    const initialState: CheckboxState = createCheckboxState(partialInitialState);
    return function (state: CheckboxState = initialState, event: FormElementEvent): CheckboxState {
        return internalFormElementReducer<CheckboxState>(state, event);
    };
}
