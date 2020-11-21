import React, { FC, ReactNode } from 'react';
import {
    createMenuStateForNewlyFocusedDeepNestedOption,
    findDeepestVisibleMenuNestingLevel,
    findOptionPathByDeepNestedOption,
    MenuState,
    OptionState,
    createMenuStateWithNextNewlyFocusedDeepNestedOption,
    createMenuStateWithPreviousNewlyFocusedDeepNestedOption,
    createMenuStateByDecreasedNestingLevelVisibility,
    createMenuStateByIncreasedNestingLevelVisibility,
    createMenuStateByNewNestingLevelVisibilityRestriction,
} from 'packages/common/layout-foundation/menu/domain';
import { InternalClassicMultiLevelMenu } from './internal.classic.multi.level.menu';
import { useKeyPress } from 'packages/common/layout-foundation/general/ui/all';

type ClassicMultiLevelMenuProps = {
    data: MenuState;
    onChangeData: (menu: MenuState) => void;
    renderOption: (option: OptionState, nestingLevel: number) => ReactNode;
    onChooseOption?: (option: OptionState, nestingLevel: number) => void;
    renderHeader?: (focusedOption: null | OptionState, nestingLevel: number) => ReactNode;
};

function getNewMenuStateByNewDeepNestedFocusedOption(
    menu: MenuState,
    option: OptionState,
    nestingLevel: number
): MenuState {
    const foundOptionPath = findOptionPathByDeepNestedOption(menu, option, nestingLevel);
    const optionPath = foundOptionPath === null ? [] : foundOptionPath;
    return createMenuStateForNewlyFocusedDeepNestedOption(menu, optionPath);
}

export const ClassicMultiLevelMenu: FC<ClassicMultiLevelMenuProps> = (props) => {
    useKeyPress(
        (keyboardKey, event) => {
            if (event && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(keyboardKey)) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (keyboardKey === 'ArrowLeft') {
                props.onChangeData(createMenuStateByDecreasedNestingLevelVisibility(props.data));
                return;
            }
            if (keyboardKey === 'ArrowRight') {
                props.onChangeData(createMenuStateByIncreasedNestingLevelVisibility(props.data));
                return;
            }
            if (keyboardKey === 'ArrowUp') {
                props.onChangeData(createMenuStateWithPreviousNewlyFocusedDeepNestedOption(props.data));
                return;
            }
            if (keyboardKey === 'ArrowDown') {
                props.onChangeData(createMenuStateWithNextNewlyFocusedDeepNestedOption(props.data));
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
            onMouseEnterOption={(option, nestingLevel) =>
                props.onChangeData(getNewMenuStateByNewDeepNestedFocusedOption(props.data, option, nestingLevel))
            }
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
                    props.onChangeData(createMenuStateByNewNestingLevelVisibilityRestriction(props.data, null));
                    return;
                }
                if (optionHasChildMenu && nestingLevel !== deepestVisibleNestingLevel) {
                    props.onChangeData(createMenuStateByNewNestingLevelVisibilityRestriction(props.data, nestingLevel));
                    return;
                }
                props.onChangeData(getNewMenuStateByNewDeepNestedFocusedOption(props.data, option, nestingLevel));
            }}
        />
    );
};
