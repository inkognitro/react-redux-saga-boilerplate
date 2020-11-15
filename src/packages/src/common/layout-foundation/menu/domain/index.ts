import { MenuState as MenuStateType, OptionState as OptionStateType } from './types';

export type MenuState<OptionData = any> = MenuStateType<OptionData>;
export type OptionState<OptionData = any> = OptionStateType<OptionData>;

export { findOptionPathByDeepNestedOption } from './query';

export { createMenuState, createMenuStateByFocusedDeepNestedOption } from './state.factory';
