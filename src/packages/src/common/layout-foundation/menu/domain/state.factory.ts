import { v4 as uuidV4 } from 'uuid';
import { MenuState, OptionState } from './types';
import {
    findDeepestVisibleMenuNestingLevel,
    findMenuWithNestingLevelOfFocusedOption,
    findNextOptionToFocus,
    findOptionPathByDeepNestedOption,
    findPreviousOptionToFocus,
} from './query';

type OptionStateCreationSettings<OptionData> = {
    key?: string;
    isSelected?: boolean;
    data: OptionData;
    childMenu?: MenuStateCreationSettings<OptionData>;
};

function createOptionState<OptionData = any>(
    settings: OptionStateCreationSettings<OptionData>
): OptionState<OptionData> {
    const state = {
        key: settings.key ? settings.key : uuidV4(),
        isSelected: settings.isSelected ? settings.isSelected : false,
        isFocused: false,
        isInFocusPath: false,
        data: settings.data,
    };
    if (settings.childMenu) {
        return {
            ...state,
            childMenu: createMenuState(settings.childMenu),
        };
    }
    return state;
}

type MenuStateCreationSettings<OptionData> = Partial<Omit<MenuState<OptionData>, 'options'>> & {
    isVisible?: boolean;
    options: OptionStateCreationSettings<OptionData>[];
};

export function createMenuState<OptionData = any>(
    settings: MenuStateCreationSettings<OptionData>
): MenuState<OptionData> {
    return {
        isVisible: settings.isVisible === undefined ? true : settings.isVisible,
        options: settings.options.map((optionSettings) => createOptionState<OptionData>(optionSettings)),
    };
}

export function createMenuStateForNewlyFocusedDeepNestedOption(
    menu: MenuState,
    focusedOptionPath: OptionState[]
): MenuState {
    const focusPathOption = focusedOptionPath.length ? focusedOptionPath[0] : null;
    const nextFocusedOptionPath = focusedOptionPath.slice(1);
    return {
        ...menu,
        options: menu.options.map((option) => {
            const isInFocusPath = focusPathOption !== null && option.key === focusPathOption.key;
            const newOption = {
                ...option,
                isFocused: isInFocusPath && nextFocusedOptionPath.length === 0,
                isInFocusPath: isInFocusPath,
            };
            if (!newOption.childMenu || !newOption.childMenu.options.length) {
                return newOption;
            }
            return {
                ...newOption,
                childMenu: createMenuStateForNewlyFocusedDeepNestedOption(newOption.childMenu, nextFocusedOptionPath),
            };
        }),
    };
}

export function createMenuStateByDecreasedNestingLevelVisibility(menu: MenuState): MenuState {
    const deepestVisibleNestingLevel = findDeepestVisibleMenuNestingLevel(menu);
    if (deepestVisibleNestingLevel === 0) {
        return menu;
    }
    return createMenuStateByNewNestingLevelVisibilityRestriction(menu, deepestVisibleNestingLevel - 1);
}

export function createMenuStateByIncreasedNestingLevelVisibility(menu: MenuState): MenuState {
    // todo: implement!
    return menu;
}

export function createMenuStateByNewNestingLevelVisibilityRestriction(
    menu: MenuState,
    newNestingLevelVisibilityRestriction: null | number,
    currentNestingLevel: number = 0
): MenuState {
    return {
        ...menu,
        isVisible:
            newNestingLevelVisibilityRestriction === null ||
            newNestingLevelVisibilityRestriction >= currentNestingLevel,
        options: menu.options.map((option) => {
            if (!option.childMenu) {
                return option;
            }
            return {
                ...option,
                childMenu: createMenuStateByNewNestingLevelVisibilityRestriction(
                    option.childMenu,
                    newNestingLevelVisibilityRestriction,
                    currentNestingLevel + 1
                ),
            };
        }),
    };
}

export function createMenuStateWithNextNewlyFocusedDeepNestedOption(
    menu: MenuState,
    nestingLevel: number = 0
): MenuState {
    const menuWithNestingLevelOfFocusedOption = findMenuWithNestingLevelOfFocusedOption(menu, nestingLevel);
    if (!menuWithNestingLevelOfFocusedOption) {
        return menu;
    }
    const optionToFocus = findNextOptionToFocus(menuWithNestingLevelOfFocusedOption.menu.options);
    if (!optionToFocus) {
        return menu;
    }
    const path = findOptionPathByDeepNestedOption(
        menu,
        optionToFocus,
        menuWithNestingLevelOfFocusedOption.nestingLevel
    );
    if (!path) {
        return menu;
    }
    return createMenuStateForNewlyFocusedDeepNestedOption(menu, path);
}

export function createMenuStateWithPreviousNewlyFocusedDeepNestedOption(
    menu: MenuState,
    nestingLevel: number = 0
): MenuState {
    const menuWithNestingLevelOfFocusedOption = findMenuWithNestingLevelOfFocusedOption(menu, nestingLevel);
    if (!menuWithNestingLevelOfFocusedOption) {
        return menu;
    }
    const optionToFocus = findPreviousOptionToFocus(menuWithNestingLevelOfFocusedOption.menu.options);
    if (!optionToFocus) {
        return menu;
    }
    const path = findOptionPathByDeepNestedOption(
        menu,
        optionToFocus,
        menuWithNestingLevelOfFocusedOption.nestingLevel
    );
    if (!path) {
        return menu;
    }
    return createMenuStateForNewlyFocusedDeepNestedOption(menu, path);
}
