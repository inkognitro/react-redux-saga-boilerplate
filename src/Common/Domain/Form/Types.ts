import { FormElementState } from "Common/Domain/FormElement/Types";

export type FormState = {
    id: string,
    elementsByName: {
        [name: string]: FormElementState,
    }
};
