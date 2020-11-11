import { Reducer } from 'redux';
import {
    createCheckboxState,
    createPasswordFieldState,
    createTextFieldState,
} from 'packages/common/form-element/general/domain';
import { createFormElementsByNameFormReducer } from 'packages/common/form/domain';
import { LoginFormState, LoginPageState } from './types';
import { LoginPageEventTypes } from './event';

const loginFormReducer = createFormElementsByNameFormReducer<LoginFormState>({
    initialStateSettings: {
        content: {
            username: createTextFieldState({
                value: 'nagato',
                fieldMessagePathPart: 'username',
            }),
            password: createPasswordFieldState({ value: '1234' }),
            shouldRemember: createCheckboxState({}),
        },
    },
});

const initialState: LoginPageState = {
    form: loginFormReducer(undefined, { type: undefined }),
};

export const loginPageReducer: Reducer<LoginPageState> = (state = initialState, action) => {
    switch (action.type) {
        case LoginPageEventTypes.LOGIN_PAGE_WAS_INITIALIZED:
            return initialState;
        default:
            return {
                ...state,
                form: loginFormReducer(state.form, action),
            };
    }
};
