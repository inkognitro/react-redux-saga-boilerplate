import { FormElementState } from "Common/Domain/FormElements/Types";

export type FormCreationSettings = {
    id?: string,
    elementPresetsByName: {
        [name: string]: Partial<FormElementState>,
    },
};

/*
export const exampleFormState = createFormState({
    id: 'loginForm1',
    elementPresetsByName: {
        username: createTextFieldState(),
        password: createPasswordFieldState(),
    },
});
*/
