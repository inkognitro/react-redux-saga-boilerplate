import { FormState } from "packages/common/form/domain";
import { CheckboxState, PasswordFieldState, TextFieldState } from "packages/common/form-element/domain";
import { Route } from "packages/common/router/domain";

type LoginFormState = FormState<{
    username: TextFieldState
    password: PasswordFieldState
    rememberMe: CheckboxState
}>

export type LoginPageState = {
    form: LoginFormState
}

export const loginRoute: Route = {
    urlSchema: "/auth/login",
    urlMustMatchExactly: true,
};

export type LoginPageStateSelector = (rootState: any) => LoginPageState
