import { FormElementState } from "Common/Domain/FormElements/Types";
import { FormWasSetToRunningRequestMode } from "Common/Domain/Form/Event/FormWasSetToRunningRequestMode";
import {FormWasSetToNoRunningRequestMode} from "Common/Domain/Form/Event/FormWasSetToNoRunningRequestMode";

export enum FormEventTypes {
    FORM_WAS_SET_TO_RUNNING_REQUEST_MODE = 'FORM_WAS_SET_TO_RUNNING_REQUEST_MODE-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
    FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE = 'FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
}

export type FormEvent = (FormWasSetToRunningRequestMode | FormWasSetToNoRunningRequestMode);

export type FormState = {
    id: string,
    isRequestRunning: boolean,
    elementsByName: {
        [name: string]: FormElementState,
    }
};
