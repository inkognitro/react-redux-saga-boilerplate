import { FormState } from "Common/Domain/FormUtils/Form/Types";
import { PasswordFieldState, TextFieldState } from "Common/Domain/FormUtils/FormElements/Types";

type LoginFormState = FormState<{
    username: TextFieldState
    password: PasswordFieldState
}>

export type LoginPageState = {
    form: LoginFormState
}
