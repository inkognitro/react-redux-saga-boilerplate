import { CheckboxState, PasswordFieldState, TextFieldState } from 'packages/common/form-element/general/domain';
import { FormState } from 'packages/common/form/domain';

export type LoginFormState = FormState<{
    username: TextFieldState;
    password: PasswordFieldState;
    shouldRemember: CheckboxState;
}>;

export type LoginPageState = { form: LoginFormState };

export type LoginPageStateSelector = (state: any) => LoginPageState;
