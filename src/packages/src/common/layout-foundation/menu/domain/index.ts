import { MenuState as MenuStateType, MenuOptionState as MenuOptionStateType } from './types';

export type MenuState<OptionData = any> = MenuStateType<OptionData>;
export type MenuOptionState<OptionData = any> = MenuOptionStateType<OptionData>;

export { createMenuState } from './state.factory';
