import { Event } from 'Common/Domain/Bus/Event';
import uuidV4 from 'uuid/v4';
import { FormState } from "Common/Domain/Form/Types";

const initialFormState: FormState = {
    id: uuidV4(),
    elementsByName: {},
};

export function reducer(state: FormState = initialFormState, event?: Event): FormState {
    if (!event) {
        return state;
    }



    return state;
}
