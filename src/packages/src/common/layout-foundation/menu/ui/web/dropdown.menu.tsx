import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { OptionsMenu } from 'packages/common/layout-foundation/options/ui/web';
import { createBoxShadowCss, StyledComponentProps } from 'packages/common/design/ui/web';
import { MenuOptionState, MenuState } from 'packages/common/layout-foundation/menu/domain';
import { ArrowRightIcon, IconSizes, IconTypes } from 'packages/common/icon/ui/web';
import { useKeyPress } from 'packages/common/layout-foundation/general/ui/all';

const StyledSubMenuContainer = styled.div`
    position: absolute;
    left: 100%;
    margin-top: -20px;
`;

const StyledOptionContainer = styled.div`
    display: table;
    width: 100%;
`;

const StyledOptionNameContainer = styled.div`
    display: table-cell;
`;

const StyledOptionIconContainer = styled.div`
    display: table-cell;
    text-align: right;
`;

type CommonApiCallbacks = {
    nestingLevel: number;
    renderHeader?: (focusedOption: null | MenuOptionState, nestingLevel: number) => ReactNode;
    renderOption: (option: MenuOptionState, nestingLevel: number) => ReactNode;
    onChooseOption?: (option: MenuOptionState, nestingLevel: number) => void;
};

type DropdownMenuOptionProps = CommonApiCallbacks & {
    data: MenuOptionState;
    onChangeData: (option: MenuOptionState) => void;
};

export const DropdownMenuOption: FC<DropdownMenuOptionProps> = (props) => {
    useKeyPress((keyboardKey) => {
        console.log('keyboard = ' + keyboardKey);
        if (keyboardKey === 'ArrowLeft') {
        }
        if (keyboardKey === 'ArrowRight') {
        }
    }, []);
    const subMenu =
        !props.data.childMenu ||
        !props.data.childMenu.isVisible ||
        !props.data.childMenu.options.length ||
        !props.data.isFocused ? null : (
            <StyledSubMenuContainer>
                <DropdownMenu
                    data={props.data.childMenu}
                    onChangeData={(menu) =>
                        props.onChangeData({
                            ...props.data,
                            childMenu: menu,
                        })
                    }
                    nestingLevel={props.nestingLevel + 1}
                    renderOption={props.renderOption}
                    onChooseOption={props.onChooseOption}
                    renderHeader={props.renderHeader}
                />
            </StyledSubMenuContainer>
        );
    return (
        <div>
            {subMenu}
            <StyledOptionContainer>
                <StyledOptionNameContainer>
                    {props.renderOption(props.data, props.nestingLevel)}
                </StyledOptionNameContainer>
                {props.data.data.children.length > 0 && (
                    <StyledOptionIconContainer>
                        <ArrowRightIcon size={IconSizes.SM} type={IconTypes.INTERACTIVE} />
                    </StyledOptionIconContainer>
                )}
            </StyledOptionContainer>
        </div>
    );
};

function findFocusedOption(options: MenuOptionState[]): null | MenuOptionState {
    const focusedOption = options.find((option) => option.isFocused);
    if (!focusedOption) {
        return null;
    }
    return focusedOption;
}

type DropdownMenuProps = CommonApiCallbacks & {
    data: MenuState;
    onChangeData: (data: MenuState) => void;
};

const StyledMenu = styled.div`
    position: relative;
    ${createBoxShadowCss()}
    border: 1px solid ${(props: StyledComponentProps) => props.theme.colorSmoothLineOnWhite};
`;

// todo: cleanup naming
// todo: fix keyboard listening
export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
    const nestingLevel = props.nestingLevel === undefined ? 0 : props.nestingLevel;
    const header = props.renderHeader && props.renderHeader(findFocusedOption(props.data.options), nestingLevel);
    return (
        <StyledMenu>
            {header}
            <OptionsMenu
                options={props.data.options}
                onChangeOptions={(options: MenuOptionState[]) => {
                    props.onChangeData({
                        ...props.data,
                        options: options,
                    });
                }}
                renderOption={(option: MenuOptionState) => (
                    <DropdownMenuOption
                        data={option}
                        onChangeData={(changedOptionData: MenuOptionState) => {
                            props.onChangeData({
                                ...props.data,
                                options: props.data.options.map((optionData) => {
                                    if (optionData.key === changedOptionData.key) {
                                        return changedOptionData;
                                    }
                                    return optionData;
                                }),
                            });
                        }}
                        nestingLevel={nestingLevel}
                        renderOption={props.renderOption}
                        onChooseOption={props.onChooseOption}
                    />
                )}
                shouldListenToKeyboardEvents={true}
                onChooseOption={(option: MenuOptionState) => {
                    if (!props.onChooseOption || option.data.children.length > 0) {
                        return;
                    }
                    props.onChooseOption(option, nestingLevel);
                }}
                shouldLooseFocusOnMouseLeave={false}
            />
        </StyledMenu>
    );
};
