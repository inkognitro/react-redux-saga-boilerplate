import React, { FC, ReactNode, useState } from 'react';
import {
    createMenuStateByFocusedDeepNestedOption,
    findOptionPathByDeepNestedOption,
    MenuState,
    OptionState,
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

function getNewMenuStateWithDeepNestedFocusedOption(
    menu: MenuState,
    option: OptionState,
    nestingLevel: number
): MenuState {
    const foundOptionPath = findOptionPathByDeepNestedOption(menu, option, nestingLevel);
    const optionPath = foundOptionPath === null ? [] : foundOptionPath;
    return createMenuStateByFocusedDeepNestedOption(menu, optionPath);
}

// function getMaxPossibleVisibleMenuNestingLevel(menu: MenuState): number {}

export const ClassicMultiLevelMenu: FC<ClassicMultiLevelMenuProps> = (props) => {
    const [visibleMenuNestingLevel, setVisibleMenuNestingLevel] = useState<number | null>(null);
    useKeyPress(
        (keyboardKey) => {
            if (keyboardKey === 'ArrowLeft' && visibleMenuNestingLevel) {
            }
            if (keyboardKey === 'ArrowRight' && visibleMenuNestingLevel !== null) {
            }
        },
        [props.data, visibleMenuNestingLevel, props.onChangeData]
    );
    return (
        <InternalClassicMultiLevelMenu
            visibleMenuNestingLevel={visibleMenuNestingLevel === null ? undefined : visibleMenuNestingLevel}
            nestingLevel={0}
            data={props.data}
            renderOption={props.renderOption}
            renderHeader={props.renderHeader}
            onMouseEnterOption={(option, nestingLevel) =>
                props.onChangeData(getNewMenuStateWithDeepNestedFocusedOption(props.data, option, nestingLevel))
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
                if (optionHasChildMenu && nestingLevel === visibleMenuNestingLevel) {
                    setVisibleMenuNestingLevel(null);
                    return;
                }
                if (optionHasChildMenu && nestingLevel !== visibleMenuNestingLevel) {
                    setVisibleMenuNestingLevel(nestingLevel);
                    return;
                }
                props.onChangeData(getNewMenuStateWithDeepNestedFocusedOption(props.data, option, nestingLevel));
            }}
        />
    );
};
