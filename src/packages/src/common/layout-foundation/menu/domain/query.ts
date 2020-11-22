import { MenuState, OptionState } from './types';

export function findOptionPathByOption(menu: MenuState, optionToFindPathFor: OptionState): null | OptionState[] {
    for (let index in menu.options) {
        const option = menu.options[index];
        if (option.key === optionToFindPathFor.key) {
            return [option];
        }
        if (!option.childMenu || !option.childMenu.options.length) {
            continue;
        }
        const optionPath = findOptionPathByOption(option.childMenu, optionToFindPathFor);
        if (!optionPath) {
            continue;
        }
        return [option, ...optionPath];
    }
    return null;
}

type OptionWithNestingLevel = {
    option: OptionState;
    nestingLevel: number;
};

export function findFocusedOptionWithNestingLevel(menu: MenuState): null | OptionWithNestingLevel {
    const inFocusOptionPath = getInFocusOptionPath(menu);
    if (!inFocusOptionPath.length) {
        return null;
    }
    const option = inFocusOptionPath[inFocusOptionPath.length - 1];
    if (!option.isFocused) {
        return null;
    }
    return {
        option: option,
        nestingLevel: inFocusOptionPath.length - 1,
    };
}

export function findInFocusPathOption(options: OptionState[]): OptionState | null {
    if (options.length === 0) {
        return null;
    }
    const inFocusPathOption = options.find((option) => option.isInFocusPath);
    return !inFocusPathOption ? null : inFocusPathOption;
}

export function findDeepestVisibleMenuNestingLevel(menu: MenuState, nestingLevel: number = 0): number {
    const inFocusPathOption = menu.options.find((option) => option.isInFocusPath);
    if (!inFocusPathOption) {
        return nestingLevel;
    }
    if (
        !inFocusPathOption.childMenu ||
        !inFocusPathOption.childMenu.options.length ||
        !inFocusPathOption.childMenu.isVisible
    ) {
        return nestingLevel;
    }
    return findDeepestVisibleMenuNestingLevel(inFocusPathOption.childMenu, nestingLevel + 1);
}

export function findMenuOfFocusedOption(menu: MenuState): null | MenuState {
    const inFocusPathOption = menu.options.find((option) => option.isInFocusPath);
    if (!inFocusPathOption) {
        return null;
    }
    if (inFocusPathOption && inFocusPathOption.isFocused) {
        return menu;
    }
    if (inFocusPathOption.childMenu) {
        return findMenuOfFocusedOption(inFocusPathOption.childMenu);
    }
    return null;
}

export function getInFocusOptionPath(menu: MenuState): OptionState[] {
    for (let index in menu.options) {
        const option = menu.options[index];
        if (!option.isInFocusPath) {
            continue;
        }
        if (!option.childMenu || !option.childMenu.options.length) {
            return [option];
        }
        const inFocusOptionPath = getInFocusOptionPath(option.childMenu);
        if (inFocusOptionPath) {
            return [option, ...inFocusOptionPath];
        }
    }
    return [];
}

export function findPreviousOptionToFocus(options: OptionState[]): OptionState | null {
    const focusableOptions = options.filter((option) => option.canBeFocused);
    if (focusableOptions.length === 0) {
        return null;
    }
    const inFocusPathOption = findInFocusPathOption(focusableOptions);
    if (!inFocusPathOption) {
        return focusableOptions[0];
    }
    const inFocusPathOptionIndex = focusableOptions.findIndex((option) => option.key === inFocusPathOption.key);
    if (inFocusPathOptionIndex > 0) {
        return focusableOptions[inFocusPathOptionIndex - 1];
    }
    return inFocusPathOption;
}

export function findNextOptionToFocus(options: OptionState[]): OptionState | null {
    const focusableOptions = options.filter((option) => option.canBeFocused);
    if (focusableOptions.length === 0) {
        return null;
    }
    const inFocusPathOption = findInFocusPathOption(focusableOptions);
    if (!inFocusPathOption) {
        return focusableOptions[0];
    }
    const inFocusPathOptionIndex = focusableOptions.findIndex((option) => option.key === inFocusPathOption.key);
    if (inFocusPathOptionIndex === -1) {
        return focusableOptions[0];
    }
    if (inFocusPathOptionIndex < focusableOptions.length - 1) {
        return focusableOptions[inFocusPathOptionIndex + 1];
    }
    return inFocusPathOption;
}
