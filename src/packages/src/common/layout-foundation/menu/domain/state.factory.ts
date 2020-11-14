import { MenuState, MenuOptionState } from './types';
import { createOptionState } from 'packages/common/layout-foundation/options/domain';

type MenuOptionStateCreationSettings<MenuOptionData> = {
    isFocused?: boolean;
    isSelected?: boolean;
    data: MenuOptionData;
    childMenu?: MenuStateCreationSettings<MenuOptionData>;
};

function createMenuOptionState<MenuOptionData = any>(
    settings: MenuOptionStateCreationSettings<MenuOptionData>
): MenuOptionState<MenuOptionData> {
    return {
        ...createOptionState({
            isFocused: !!settings.isFocused,
            isSelected: !!settings.isSelected,
            data: settings.data,
        }),
        childMenu: settings.childMenu ? createMenuState(settings.childMenu) : undefined,
    };
}

type MenuStateCreationSettings<MenuOptionData> = Partial<MenuState<MenuOptionData>> & {
    isVisible?: boolean;
    options: MenuOptionStateCreationSettings<MenuOptionData>[];
};

export function createMenuState<MenuOptionData = any>(
    settings: MenuStateCreationSettings<MenuOptionData>
): MenuState<MenuOptionData> {
    return {
        isVisible: !!settings.isVisible,
        // @ts-ignore
        options: settings.options.map((option) => createMenuOptionState<MenuOptionData>(option)),
    };
}
