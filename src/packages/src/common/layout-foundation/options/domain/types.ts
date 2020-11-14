export type OptionState<Data = any> = {
    key: string;
    isSelected: boolean;
    isFocused: boolean;
    data: Data;
};
