import { FormState } from "Packages/Common/Form/Domain";
import { CheckboxState, PasswordFieldState, TextFieldState } from "Packages/Common/FormElement/Domain";

type LoginFormState = FormState<{
    username: TextFieldState
    password: PasswordFieldState
    rememberMe: CheckboxState
}>

export type LoginPageState = {
    form: LoginFormState
}

export enum LoginPageCommandTypes {
    LOGIN = "LOGIN-7b0d7106-9bb4-4814-aa9c-94ceb0f26f48",
}

export type LoginPageStateSelector = (rootState: any) => LoginPageState
