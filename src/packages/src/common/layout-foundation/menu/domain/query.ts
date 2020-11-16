import { MenuState, OptionState } from './types';

export function findOptionPathByDeepNestedOption(
    menu: MenuState,
    optionToFindPathFor: OptionState,
    nestingLevelOfOptionToFindPathFor: number
): null | OptionState[] {
    if (nestingLevelOfOptionToFindPathFor === 0) {
        const option = menu.options.find((option) => option.key === optionToFindPathFor.key);
        return option ? [option] : null;
    }
    for (let index in menu.options) {
        const option = menu.options[index];
        if (!option.childMenu || !option.childMenu.options.length) {
            continue;
        }
        const optionPath = findOptionPathByDeepNestedOption(
            option.childMenu,
            optionToFindPathFor,
            nestingLevelOfOptionToFindPathFor - 1
        );
        if (optionPath === null) {
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

type MenuWithNestingLevel = {
    menu: MenuState;
    nestingLevel: number;
};

export function findMenuWithNestingLevelOfFocusedOption(
    menu: MenuState,
    nestingLevel: number = 0
): null | MenuWithNestingLevel {
    const inFocusPathOption = menu.options.find((option) => option.isInFocusPath);
    if (!inFocusPathOption) {
        return null;
    }
    if (inFocusPathOption && inFocusPathOption.isFocused) {
        return {
            menu: menu,
            nestingLevel: nestingLevel,
        };
    }
    if (inFocusPathOption.childMenu) {
        return findMenuWithNestingLevelOfFocusedOption(inFocusPathOption.childMenu, nestingLevel + 1);
    }
    return null;
}

export function findPreviousOptionToFocus(options: OptionState[]): OptionState | null {
    if (options.length === 0) {
        return null;
    }
    const focusedOption = findInFocusPathOption(options);
    if (!focusedOption) {
        return options[0];
    }
    const focusedOptionIndex = options.findIndex((option) => option.key === focusedOption.key);
    if (focusedOptionIndex > 0) {
        return options[focusedOptionIndex - 1];
    }
    return focusedOption;
}

export function findNextOptionToFocus(options: OptionState[]): OptionState | null {
    if (options.length === 0) {
        return null;
    }
    const focusedOption = findInFocusPathOption(options);
    if (!focusedOption) {
        return options[0];
    }
    const focusedOptionIndex = options.findIndex((option) => option.key === focusedOption.key);
    if (focusedOptionIndex === -1) {
        return options[0];
    }
    if (focusedOptionIndex < options.length - 1) {
        return options[focusedOptionIndex + 1];
    }
    return focusedOption;
}

// todo: use in UI layer for dropdown:
export function setSelectedOptionsScrollPosition(
    containerElement: HTMLDivElement | null,
    focusedElement: HTMLDivElement | null
): void {
    if (!containerElement || !focusedElement) {
        return;
    }
    const isFocusedElementAboveContainerTop = focusedElement.offsetTop < containerElement.scrollTop;
    if (isFocusedElementAboveContainerTop) {
        focusedElement.scrollIntoView({ block: 'start' });
        return;
    }
    const containerBottom = containerElement.scrollTop + containerElement.clientHeight;
    const focusedElementBottom = focusedElement.offsetTop + focusedElement.clientHeight;
    const isFocusedElementBelowContainerBottom = focusedElementBottom < containerBottom;
    if (isFocusedElementBelowContainerBottom) {
        focusedElement.scrollIntoView({ block: 'start' });
        return;
    }
}
