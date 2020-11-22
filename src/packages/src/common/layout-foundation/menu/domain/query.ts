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
    const focusedOption = findInFocusPathOption(focusableOptions);
    if (!focusedOption) {
        return focusableOptions[0];
    }
    const focusedOptionIndex = focusableOptions.findIndex((option) => option.key === focusedOption.key);
    if (focusedOptionIndex > 0) {
        return focusableOptions[focusedOptionIndex - 1];
    }
    return focusedOption;
}

export function findNextOptionToFocus(options: OptionState[]): OptionState | null {
    const focusableOptions = options.filter((option) => option.canBeFocused);
    if (focusableOptions.length === 0) {
        return null;
    }
    const focusedOption = findInFocusPathOption(focusableOptions);
    if (!focusedOption) {
        return focusableOptions[0];
    }
    const focusedOptionIndex = focusableOptions.findIndex((option) => option.key === focusedOption.key);
    if (focusedOptionIndex === -1) {
        return focusableOptions[0];
    }
    if (focusedOptionIndex < focusableOptions.length - 1) {
        return focusableOptions[focusedOptionIndex + 1];
    }
    return focusedOption;
}
