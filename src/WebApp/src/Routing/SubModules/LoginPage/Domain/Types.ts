import {FormState} from "Packages/Common/Form/Domain";
import {CheckboxState, PasswordFieldState, TextFieldState} from "Packages/Common/FormElement/Domain";

type LoginFormState = FormState<{
    username: TextFieldState
    password: PasswordFieldState
    rememberMe: CheckboxState
}>

export type LoginPageState = {
    form: LoginFormState
}

export type LoginPageStateSelector = (rootState: any) => LoginPageState
