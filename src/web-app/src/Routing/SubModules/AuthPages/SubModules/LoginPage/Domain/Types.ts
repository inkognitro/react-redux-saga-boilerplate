import { FormState } from "packages/common/Form/Domain";
import { CheckboxState, PasswordFieldState, TextFieldState } from "packages/common/FormElement/Domain";
import { Route } from "packages/common/Router/Domain";

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
