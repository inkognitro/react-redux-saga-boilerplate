import uuidV4 from 'uuid/v4';
import { FormElementsByName, FormState } from "Packages/Common/Form/Domain/Types";

type FormStateCreationSettings<SpecificFormElementsByName> = (Partial<FormState<SpecificFormElementsByName>> & {
    elementsByName: FormElementsByName<SpecificFormElementsByName>
});

export function createFormState<SpecificFormElementsByName>(
    settings: FormStateCreationSettings<SpecificFormElementsByName>,
): FormState<SpecificFormElementsByName> {
    return {
        id: uuidV4(),
        isRequestRunning: false,
        elementsByName: settings.elementsByName,
    };
}
