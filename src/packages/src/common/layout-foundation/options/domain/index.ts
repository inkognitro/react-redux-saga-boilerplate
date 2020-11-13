import { OptionState as OptionStateType } from './types';
import { OptionStateCreationSettings as OptionStateCreationSettingsType } from './state.factory';

export type OptionState<Data = any> = OptionStateType<Data>;
export type OptionStateCreationSettings<Data = any> = OptionStateCreationSettingsType<Data>;

export { createOptionsState, createOptionState } from './state.factory';
