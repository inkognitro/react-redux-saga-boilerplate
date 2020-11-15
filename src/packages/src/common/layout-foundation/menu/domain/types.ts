export type OptionState<OptionData = any> = {
    key: string;
    isSelected: boolean;
    isFocused: boolean;
    childMenu?: MenuState<OptionData>;
    data: OptionData;
};

export type MenuState<OptionData = any> = {
    isVisible: boolean;
    options: OptionState<OptionData>[];
};
