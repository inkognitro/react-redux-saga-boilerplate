import { FormState } from "Common/Domain/FormUtils/Form/Types";
import { PasswordFieldState, TextFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";

type LoginFormState = FormState<{
    username: TextFieldState
    password: PasswordFieldState
}>

export type LoginPageState = {
    form: LoginFormState
}

export type LoginPageStateSelector = (state: RootState) => LoginPageState;

export enum LoginPageCommandTypes {
    LOGIN = "LOGIN-7b0d7106-9bb4-4814-aa9c-94ceb0f26f48",
}
