import {
    FormState as FormStateType,
    FormElementsByName as FormElementsByNameType,
    FormEvent as FormEventType,
} from './Domain/Types';
import { SubmitForm as SubmitFormType } from './Domain/Command/SubmitForm';
import {
    FormWasSetToNoRunningRequestMode as FormWasSetToNoRunningRequestModeType,
} from './Domain/Event/FormWasSetToNoRunningRequestMode';
import {
    FormWasSetToRunningRequestMode as FormWasSetToRunningRequestModeType,
} from './Domain/Event/FormWasSetToRunningRequestMode';

export type FormState<SpecificElementsByName = {}> = FormStateType<SpecificElementsByName>;
export type SubmitForm = SubmitFormType;
export type FormWasSetToNoRunningRequestMode = FormWasSetToNoRunningRequestModeType;
export type FormWasSetToRunningRequestMode = FormWasSetToRunningRequestModeType;

export { FormCommandTypes, FormEventTypes } from './Domain/Types';
export { createSetFormFieldMessages } from './Domain/Command/SetFormFieldMessages';
export { createSubmitForm } from './Domain/Command/SubmitForm';
export { formReducer } from './Domain/Reducer';
export { createFormSaga } from './Domain/Saga/Flow';
export { createFormState } from './Domain/FormStateFactory';
export { createFormParameters } from './Domain/Query/FormParameters';
export { FormWC } from './UI/FormWC';
