import { MenuState as MenuStateType, OptionState as OptionStateType } from './types';

export type MenuState<OptionData = any> = MenuStateType<OptionData>;
export type OptionState<OptionData = any> = OptionStateType<OptionData>;

export { findFocusedOptionWithNestingLevel, findInFocusPathOption, findDeepestVisibleMenuNestingLevel } from './query';

export {
    createMenuState,
    createMenuStateWithNextFocusedOptionOfSameNestingLevel,
    createMenuStateWithPreviousFocusedOptionOnTheSameNestingLevel,
    createMenuStateWithFocusedOptionOfPreviousNestingLevel,
    createMenuStateWithDefaultFocusedOptionOfNextNestingLevel,
    createMenuStateWithOptionToFocus,
} from './state.factory';
