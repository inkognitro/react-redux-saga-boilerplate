import { MenuState as MenuStateType, OptionState as OptionStateType } from './types';

export type MenuState<OptionData = any> = MenuStateType<OptionData>;
export type OptionState<OptionData = any> = OptionStateType<OptionData>;

export { findOptionPathByDeepNestedOption, findInFocusPathOption, findDeepestVisibleMenuNestingLevel } from './query';

export {
    createMenuState,
    createMenuStateForNewlyFocusedDeepNestedOption,
    createMenuStateWithNextNewlyFocusedDeepNestedOption,
    createMenuStateWithPreviousNewlyFocusedDeepNestedOption,
    createMenuStateByNewNestingLevelVisibilityRestriction,
    createMenuStateByDecreasedNestingLevelVisibility,
    createMenuStateByIncreasedNestingLevelVisibility,
} from './state.factory';
