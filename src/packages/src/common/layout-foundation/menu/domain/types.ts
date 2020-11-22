export type OptionState<OptionData = any> = {
    key: string;
    isSelected: boolean;
    canBeFocused: boolean;
    isFocused: boolean;
    isInFocusPath: boolean;
    childMenu?: MenuState<OptionData>;
    data: OptionData;
};

export type MenuState<OptionData = any> = {
    isVisible: boolean;
    options: OptionState<OptionData>[];
};
