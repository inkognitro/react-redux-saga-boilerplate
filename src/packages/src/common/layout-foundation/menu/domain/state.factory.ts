import { v4 as uuidV4 } from 'uuid';
import { MenuState, OptionState } from './types';

type OptionStateCreationSettings<OptionData> = {
    key?: string;
    isFocused?: boolean;
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
        isFocused: settings.isFocused ? settings.isFocused : false,
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

type MenuStateCreationSettings<OptionData> = Partial<MenuState<OptionData>> & {
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

export function createMenuStateByFocusedDeepNestedOption(menu: MenuState, focusedOptionPath: OptionState[]): MenuState {
    const focusedOption = focusedOptionPath.length ? focusedOptionPath[0] : null;
    const nextFocusedOptionPath = focusedOptionPath.slice(1);
    return {
        ...menu,
        options: menu.options.map((option) => {
            const newOption = {
                ...option,
                isFocused: focusedOption !== null && option.key === focusedOption.key,
            };
            if (!newOption.childMenu || !newOption.childMenu.options.length) {
                return newOption;
            }
            return {
                ...newOption,
                childMenu: createMenuStateByFocusedDeepNestedOption(newOption.childMenu, nextFocusedOptionPath),
            };
        }),
    };
}
