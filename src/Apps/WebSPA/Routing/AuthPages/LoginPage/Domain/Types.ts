import { FormState } from "Packages/Common/Form/Domain/Types";
import { PasswordFieldState, TextFieldState } from "Packages/Common/FormElement/Domain/Types";

type LoginFormState = FormState<{
    username: TextFieldState
    password: PasswordFieldState
}>

export type LoginPageState = {
    form: LoginFormState
}

export enum LoginPageCommandTypes {
    LOGIN = "LOGIN-7b0d7106-9bb4-4814-aa9c-94ceb0f26f48",
}
