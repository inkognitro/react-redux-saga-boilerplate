import { v4 as uuidV4 } from 'uuid';
import { FormState } from "./types";

type CreationSettings<S extends FormState> = Partial<S> & Pick<S, 'content'>
export function createFormState<S extends FormState>(settings: CreationSettings<S>): S {
    // @ts-ignore
    return {
        id: uuidV4(),
        isSubmitRunning: false,
        ...settings,
    };
}
