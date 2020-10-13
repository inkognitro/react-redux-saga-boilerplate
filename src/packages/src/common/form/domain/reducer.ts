import { Action, Reducer } from 'redux';
import { formElementReducer } from 'packages/common/form-element/domain';
import { FormElementsByNameForm, FormElementsByNameState, FormState } from './types';
import { FormEventTypes, FormSubmitHasFinished, FormSubmitHasStarted } from './event';
import { createFormState } from './state.factory';

type FormEvent = FormSubmitHasStarted | FormSubmitHasFinished;

type FormReducerCreationSettings<S extends FormState> = {
    contentReducer: Reducer;
    initialStateSettings: Partial<S> & Pick<S, 'content'>;
};

const formElementTypes = Object.values(FormEventTypes);

export function createFormReducer<S extends FormState>(settings: FormReducerCreationSettings<S>): Reducer<S> {
    const initialFormState = createFormState<S>(settings.initialStateSettings);
    return function (state: S = initialFormState, action: Action) {
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
    };
}

function formElementsByNameReducer(state: FormElementsByNameState, action?: Action): FormElementsByNameState {
    if (!action) {
        return state;
    }
    const newState: FormElementsByNameState = {};
    for (const index in state) {
        const formElementState = state[index];
        newState[index] = formElementReducer(formElementState, action);
    }
    return newState;
}

export function createFormElementsByNameFormReducer<S extends FormElementsByNameForm>(
    settings: Omit<FormReducerCreationSettings<S>, 'contentReducer'>
): Reducer<S> {
    return createFormReducer<S>({
        ...settings,
        contentReducer: formElementsByNameReducer,
    });
}
