import { Reducer } from "redux";
import { CheckboxState, FormElementEvent } from "../Types";
import { internalFormElementReducer } from "./InternalFormElementReducer";
import { createCheckboxState } from "../FormElementStateFactory";

type PartialInitialState = Partial<Omit<CheckboxState, "type">>;

export const checkboxReducer = createCheckboxReducer();

export function createCheckboxReducer(partialInitialState: PartialInitialState = {}): Reducer<CheckboxState> {
    const initialState: CheckboxState = createCheckboxState(partialInitialState);
    return function (state: CheckboxState = initialState, event: FormElementEvent): CheckboxState {
        return internalFormElementReducer<CheckboxState>(state, event);
    };
}
