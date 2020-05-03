import uuidV4 from 'uuid/v4';
import { FormState } from "Common/Domain/Form/Types";

export function createFormState(partialInitialFormState: Partial<FormState> = {}): FormState {
    return {
        id: uuidV4(),
        isRequestRunning: false,
        elementsByName: {},
        ...partialInitialFormState,
    };
}
