import { Reducer, combineReducers } from 'redux';
import {
    createCheckboxState,
    createPasswordFieldState,
    createTextFieldState,
} from "packages/common/form-element/domain";
import { createFormElementsByNameFormReducer } from "packages/common/form/domain";
import { LoginFormState, LoginPageState } from "./types";

const loginFormReducer = createFormElementsByNameFormReducer<LoginFormState>({
    initialStateSettings: {
        content: {
            username: createTextFieldState({}),
            password: createPasswordFieldState({}),
            shouldRemember: createCheckboxState({}),
        },
    },
});

export const loginPageReducer: Reducer<LoginPageState> = combineReducers({
    form: loginFormReducer,
});
