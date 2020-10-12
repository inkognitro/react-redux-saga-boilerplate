import { Reducer, Action } from 'redux';
import { FormElementState, FormElementStateChanges } from './types';
import { FormElementStatesWereChanged, FormElementStateWasChanged, FormElementEventTypes } from './event';

type FormElementEvent = FormElementStateWasChanged | FormElementStatesWereChanged;

const formElementEventTypes = Object.values(FormElementEventTypes);

export function formElementReducer<S extends FormElementState = any>(state: S, action: Action): S {
    if (!formElementEventTypes.includes(action.type)) {
        return state;
    }
    // @ts-ignore
    const event: FormElementEvent = action;
    if (
        event.type === FormElementEventTypes.FORM_ELEMENT_STATE_WAS_CHANGED &&
        state.id === event.payload.formElement.id
    ) {
        return {
            ...state,
            ...event.payload.stateChanges,
        };
    }
    if (event.type === FormElementEventTypes.FORM_ELEMENT_STATES_WERE_CHANGED) {
        if (event.payload.multipleStateChanges.length === 0) {
            return state;
        }
        const initialStateChanges: FormElementStateChanges = {
            formElement: state,
            stateChanges: {},
        };
        const mergedFormElementStateChanges = event.payload.multipleStateChanges.reduce(
            (mergedFormElementStateChanges, formElementStateChanges): FormElementStateChanges => {
                if (formElementStateChanges.formElement.id !== state.id) {
                    return mergedFormElementStateChanges;
                }
                return {
                    formElement: mergedFormElementStateChanges.formElement,
                    // @ts-ignore
                    stateChanges: {
                        ...mergedFormElementStateChanges.stateChanges,
                        ...formElementStateChanges.stateChanges,
                    },
                };
            },
            initialStateChanges
        );
        return {
            ...state,
            ...mergedFormElementStateChanges.stateChanges,
        };
    }
    return state;
}

export function createFormElementReducer<S extends FormElementState>(initialState: S): Reducer<S> {
    return function (state: S = initialState, action: Action): S {
        if (!action) {
            return state;
        }
        return formElementReducer(state, action);
    };
}
