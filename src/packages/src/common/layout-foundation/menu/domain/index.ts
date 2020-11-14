import { MenuOptionState as MenuOptionStateType } from './types';

export type MenuOptionState<OptionData = any> = MenuOptionStateType<OptionData>;

export { createMenuState } from './state.factory';
