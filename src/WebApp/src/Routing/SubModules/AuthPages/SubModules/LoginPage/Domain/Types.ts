import { FormState } from "Packages/Common/Form/Domain";
import { CheckboxState, PasswordFieldState, TextFieldState } from "Packages/Common/FormElement/Domain";
import { Route } from "Packages/Common/Router/Domain";

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
