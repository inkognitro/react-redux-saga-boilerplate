import { v4 as uuidV4 } from 'uuid';
import { FormState } from "./types";

type CreationSettings<C = any> = Partial<FormState<C>> & Pick<FormState<C>, 'content'>
export function createFormState<C = any>(settings: CreationSettings<C>): FormState<C> {
    return {
        id: uuidV4(),
        isSubmitRunning: false,
        ...settings,
    };
}
