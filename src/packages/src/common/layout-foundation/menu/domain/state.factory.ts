import { v4 as uuidV4 } from 'uuid';
import { MenuState, OptionState } from './types';
import {
    findMenuOfFocusedOption,
    findNextOptionToFocus,
    findOptionPathByOption,
    findPreviousOptionToFocus,
    getInFocusOptionPath,
} from './query';

type OptionStateCreationSettings<OptionData> = {
    key?: string;
    isSelected?: boolean;
    canBeFocused?: boolean;
    data: OptionData;
    childMenu?: MenuStateCreationSettings<OptionData>;
};

function createOptionState<OptionData = any>(
    settings: OptionStateCreationSettings<OptionData>
): OptionState<OptionData> {
    const state = {
        key: settings.key ? settings.key : uuidV4(),
        isSelected: settings.isSelected !== undefined ? settings.isSelected : false,
        canBeFocused: settings.canBeFocused !== undefined ? settings.canBeFocused : true,
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

type VisibilityChangeSettings = {
    currentNestingLevel: number;
    menuVisibilityUntilNestingLevel: null | number;
};

function createMenuStateWithFocusedOptionByPath(
    menu: MenuState,
    focusedOptionPath: OptionState[],
    visibilityChangeSettings?: VisibilityChangeSettings
): MenuState {
    const focusPathOption = focusedOptionPath.length ? focusedOptionPath[0] : null;
    const nextFocusedOptionPath = focusedOptionPath.slice(1);
    const nextVisibilityChangeSettings: VisibilityChangeSettings | undefined = !visibilityChangeSettings
        ? undefined
        : {
              ...visibilityChangeSettings,
              currentNestingLevel: visibilityChangeSettings.currentNestingLevel + 1,
          };

    let isMenuVisible = menu.isVisible;
    if (visibilityChangeSettings) {
        isMenuVisible =
            visibilityChangeSettings.menuVisibilityUntilNestingLevel === null ||
            visibilityChangeSettings.currentNestingLevel <= visibilityChangeSettings.menuVisibilityUntilNestingLevel;
    }
    return {
        ...menu,
        isVisible: isMenuVisible,
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
                childMenu: createMenuStateWithFocusedOptionByPath(
                    newOption.childMenu,
                    nextFocusedOptionPath,
                    nextVisibilityChangeSettings
                ),
            };
        }),
    };
}

export function createMenuStateWithOptionToFocus(
    menu: MenuState,
    optionToFocus: OptionState,
    menuVisibilityUntilNestingLevel?: number | null
): MenuState {
    if (!optionToFocus.canBeFocused) {
        console.warn(
            'The following option printed below cannot be focused. ' +
                'Due to performance reasons it is recommended catching this case with the "option.canBeFocused" ' +
                'flag, before generating a new state for the whole menu.',
            optionToFocus
        );
        return menu;
    }
    const foundFocusedOptionPath = findOptionPathByOption(menu, optionToFocus);
    const focusedOptionPath = foundFocusedOptionPath ? foundFocusedOptionPath : [];
    const visibilityChangeSettings: undefined | VisibilityChangeSettings =
        menuVisibilityUntilNestingLevel === undefined
            ? undefined
            : {
                  currentNestingLevel: 0,
                  menuVisibilityUntilNestingLevel: menuVisibilityUntilNestingLevel,
              };
    return createMenuStateWithFocusedOptionByPath(menu, focusedOptionPath, visibilityChangeSettings);
}

export function createMenuStateWithFocusedOptionOfPreviousNestingLevel(menu: MenuState): MenuState {
    const inFocusOptionPath = getInFocusOptionPath(menu);
    if (inFocusOptionPath.length < 2) {
        return menu;
    }
    const optionToFocus = inFocusOptionPath[inFocusOptionPath.length - 2];
    const menuVisibilityUntilNestingLevel = inFocusOptionPath.length - 2;
    return createMenuStateWithOptionToFocus(menu, optionToFocus, menuVisibilityUntilNestingLevel);
}

export function createMenuStateWithDefaultFocusedOptionOfNextNestingLevel(menu: MenuState): MenuState {
    const inFocusOptionPath = getInFocusOptionPath(menu);
    if (!inFocusOptionPath.length) {
        return menu;
    }
    const focusedOption = inFocusOptionPath[inFocusOptionPath.length - 1];
    if (!focusedOption.childMenu || !focusedOption.childMenu.options.length) {
        return menu;
    }
    const foundOptionToFocus = findNextOptionToFocus(focusedOption.childMenu.options);
    const optionToFocus = foundOptionToFocus ? foundOptionToFocus : focusedOption;
    const menuVisibilityUntilNestingLevel = inFocusOptionPath.length;
    return createMenuStateWithOptionToFocus(menu, optionToFocus, menuVisibilityUntilNestingLevel);
}

export function createMenuStateWithNextFocusedOptionOfSameNestingLevel(menu: MenuState): MenuState {
    const menuOfFocusedOption = findMenuOfFocusedOption(menu);
    const menuToUse = menuOfFocusedOption ? menuOfFocusedOption : menu;
    const optionToFocus = findNextOptionToFocus(menuToUse.options);
    if (!optionToFocus) {
        return menu;
    }
    return createMenuStateWithOptionToFocus(menu, optionToFocus);
}

export function createMenuStateWithPreviousFocusedOptionOnTheSameNestingLevel(menu: MenuState): MenuState {
    const menuOfFocusedOption = findMenuOfFocusedOption(menu);
    const menuToUse = menuOfFocusedOption ? menuOfFocusedOption : menu;
    const optionToFocus = findPreviousOptionToFocus(menuToUse.options);
    if (!optionToFocus) {
        return menu;
    }
    return createMenuStateWithOptionToFocus(menu, optionToFocus);
}
