import React, { FC, ReactNode } from 'react';
import {
    findDeepestVisibleMenuNestingLevel,
    MenuState,
    OptionState,
    createMenuStateWithNextFocusedOptionOfSameNestingLevel,
    createMenuStateWithPreviousFocusedOptionOnTheSameNestingLevel,
    createMenuStateWithFocusedOptionOfPreviousNestingLevel,
    createMenuStateWithFirstFocusedOptionOfNextNestingLevel,
    createMenuStateWithOptionToFocus,
} from 'packages/common/layout-foundation/menu/domain';
import { InternalClassicMultiLevelMenu } from './internal.classic.multi.level.menu';
import { useKeyPress } from 'packages/common/util/general/ui/web';

type ClassicMultiLevelMenuProps = {
    data: MenuState;
    onChangeData: (menu: MenuState) => void;
    renderOption: (option: OptionState, nestingLevel: number) => ReactNode;
    onChooseOption?: (option: OptionState, nestingLevel: number) => void;
    renderHeader?: (focusedOption: null | OptionState, nestingLevel: number) => ReactNode;
};

export const ClassicMultiLevelMenu: FC<ClassicMultiLevelMenuProps> = (props) => {
    useKeyPress(
        (keyboardKey, event) => {
            if (event && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(keyboardKey)) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (keyboardKey === 'ArrowLeft') {
                props.onChangeData(createMenuStateWithFocusedOptionOfPreviousNestingLevel(props.data));
                return;
            }
            if (keyboardKey === 'ArrowRight') {
                props.onChangeData(createMenuStateWithFirstFocusedOptionOfNextNestingLevel(props.data));
                return;
            }
            if (keyboardKey === 'ArrowUp') {
                props.onChangeData(createMenuStateWithPreviousFocusedOptionOnTheSameNestingLevel(props.data));
                return;
            }
            if (keyboardKey === 'ArrowDown') {
                props.onChangeData(createMenuStateWithNextFocusedOptionOfSameNestingLevel(props.data));
                return;
            }
        },
        [props.data, props.onChangeData]
    );
    return (
        <InternalClassicMultiLevelMenu
            nestingLevel={0}
            data={props.data}
            renderOption={props.renderOption}
            renderHeader={props.renderHeader}
            onMouseEnterOption={(option) => props.onChangeData(createMenuStateWithOptionToFocus(props.data, option))}
            onClickOption={(option, nestingLevel) => {
                if (!option.isFocused) {
                    return;
                }
                const optionHasChildMenu = option.childMenu && option.childMenu.options.length;
                if (!optionHasChildMenu && props.onChooseOption) {
                    props.onChooseOption(option, nestingLevel);
                    return;
                }
                const deepestVisibleNestingLevel = findDeepestVisibleMenuNestingLevel(props.data);
                if (optionHasChildMenu && nestingLevel === deepestVisibleNestingLevel) {
                    props.onChangeData(createMenuStateWithOptionToFocus(props.data, option, null));
                    return;
                }
                if (optionHasChildMenu && nestingLevel !== deepestVisibleNestingLevel) {
                    props.onChangeData(createMenuStateWithOptionToFocus(props.data, option, nestingLevel));
                    return;
                }
                props.onChangeData(createMenuStateWithOptionToFocus(props.data, option));
            }}
        />
    );
};
