import { OptionState } from 'packages/common/layout-foundation/options/domain';

export type MenuOptionState<MenuOptionData = any> = OptionState<MenuOptionData> & {
    childMenu: undefined | MenuState<MenuOptionData>;
};

export type MenuState<MenuOptionData = any> = {
    isVisible: boolean;
    options: MenuOptionState<MenuOptionData>[];
};
