import { FormElementState } from "Common/Domain/FormUtils/FormElements/Types";
import { FormWasSetToRunningRequestMode } from "Common/Domain/FormUtils/Form/Event/FormWasSetToRunningRequestMode";
import { FormWasSetToNoRunningRequestMode } from "Common/Domain/FormUtils/Form/Event/FormWasSetToNoRunningRequestMode";

export enum FormCommandTypes {
    SUBMIT_FORM = 'SUBMIT_FORM-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
}

export enum FormEventTypes {
    FORM_WAS_SET_TO_RUNNING_REQUEST_MODE = 'FORM_WAS_SET_TO_RUNNING_REQUEST_MODE-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
    FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE = 'FORM_WAS_SET_TO_NO_RUNNING_REQUEST_MODE-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
    FORM_WAS_SUBMITTED = 'FORM_WAS_SUBMITTED-5539c0dd-7765-419f-b351-8ffbb7f5aae6',
}

export type FormEvent = (FormWasSetToRunningRequestMode | FormWasSetToNoRunningRequestMode);

export type FormState<SpecificElementsByName = {}> = {
    id: string
    isRequestRunning: boolean
    elementsByName: FormElementsByName<SpecificElementsByName>
};

export type FormElementsByName<SpecificElementsByName> = (
    { [name: string]: FormElementState} & SpecificElementsByName
)
