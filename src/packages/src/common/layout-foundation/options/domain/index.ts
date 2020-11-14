import { OptionState as OptionStateType } from './types';
import { OptionStateCreationSettings as OptionStateCreationSettingsType } from './state.factory';

export type OptionState<OptionData = any> = OptionStateType<OptionData>;
export type OptionStateCreationSettings<OptionData = any> = OptionStateCreationSettingsType<OptionData>;

export { createOptionsState, createOptionState } from './state.factory';
