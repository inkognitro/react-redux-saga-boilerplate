import { FormState } from "Common/Domain/Form/Types";
import { FormElementState } from "Common/Domain/FormElement/Types";

type FormElementCreationSettings = Partial<FormElementState>;

export type FormCreationSettings = {
    id?: string,
    elementPresetsByName: {
        [name: string]: Partial<FormElementState>,
    },
};

export function createForm(settings: FormCreationSettings): FormState {

}

export const exampleForm = createForm({
    id: 'loginForm1',
    elementPresetsByName: {
        username: {
            type:
        },
    }
});