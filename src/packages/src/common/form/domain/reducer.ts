import { Action, Reducer } from 'redux';
import { FormState } from "./types";
import {
    FormEventTypes,
    FormSubmitHasFinished,
    FormSubmitHasStarted,
} from "./event";
import { createFormState } from "./state.factory";

type FormEvent = (FormSubmitHasStarted | FormSubmitHasFinished);

type CreationSettings<C> = {
    contentReducer: Reducer<C>
    initialStateSettings: Partial<FormState<C>> & Pick<FormState, 'content'>
}

const formElementTypes = Object.values(FormEventTypes);

export function createFormReducer<C = any>(settings: CreationSettings<C>): Reducer {
    const initialFormState = createFormState(settings.initialStateSettings);
    return function (state: FormState<C> = initialFormState, action: Action) {
        if (!action || !formElementTypes.includes(action.type)) {
            return {
                ...state,
                content: settings.contentReducer(state.content, action),
            };
        }
        // @ts-ignore
        const event: FormEvent = action;
        if (event.payload.form.id !== state.id) {
            return state;
        }
        if (event.type === FormEventTypes.SUBMIT_HAS_STARTED) {
            return {
                ...state,
                isSubmitRunning: true,
            };
        }
        if (event.type === FormEventTypes.SUBMIT_HAS_FINISHED) {
            return {
                ...state,
                isSubmitRunning: false,
            };
        }
        return {
            ...state,
            content: settings.contentReducer(state.content, action),
        };
    }
}
