import { OptionState as OptionStateType } from './types';

export type OptionState<Data = any> = OptionStateType<Data>;

export { createOptionsStateFromOptionsData } from './state.factory';
