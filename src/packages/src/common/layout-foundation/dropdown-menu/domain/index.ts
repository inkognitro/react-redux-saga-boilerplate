import { DropdownOptionState as DropdownOptionStateType } from './types';

export type DropdownOptionState<OptionData = any> = DropdownOptionStateType<OptionData>;

export { createDropdownOptionsState } from './state.factory';
