import { FormState } from "Packages/Common/Domain/Form/Types";
import { PasswordFieldState, TextFieldState } from "Packages/Common/Domain/FormElement/Types";

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
