import { FormState } from "Common/Domain/FormUtils/Form/Types";
import { FormElementState, FormElementTypes } from "Common/Domain/FormUtils/FormElements/Types";

export function createFormParameters(form: FormState): object {
    let parameters = {};
    for (const name in form.elementsByName) {
        const formElement = form.elementsByName[name];
        if (formElement.type === FormElementTypes.EMAIL) {
            parameters = {
                ...parameters,
                [name]: createParameterValueByFormElement(formElement),
            };
        }
    }
    return parameters;
}

function createParameterValueByFormElement(formElement: FormElementState): string {
    if (formElement.type === FormElementTypes.EMAIL) {
        return formElement.value;
    }
    if (formElement.type === FormElementTypes.TEXT) {
        return formElement.value;
    }
    if (formElement.type === FormElementTypes.PASSWORD) {
        return formElement.value;
    }
    // @ts-ignore
    throw new Error(`Form element with type "${formElement.type}" is not supported!`);
}
