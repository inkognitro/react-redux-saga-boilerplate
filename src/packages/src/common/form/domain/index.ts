import { FormState as FormStateType } from './types';
import {
    FormWasSetToNoRunningRequestMode as FormWasSetToNoRunningRequestModeType,
    FormWasSetToRunningRequestMode as FormWasSetToRunningRequestModeType,
} from "./event";
import { SubmitForm as SubmitFormType } from './command';

export type FormState<SpecificElementsByName = {}> = FormStateType<SpecificElementsByName>;
export type SubmitForm = SubmitFormType;
export type FormWasSetToNoRunningRequestMode = FormWasSetToNoRunningRequestModeType;
export type FormWasSetToRunningRequestMode = FormWasSetToRunningRequestModeType;

export { formReducer } from './reducer';
export { createFormSaga } from './saga/flow';
export { createFormState } from './form.state.factory';
export { FormEventTypes } from "./event";
export { FormCommandTypes, createSubmitForm, createSetFormFieldMessages } from './command';
