import React, { FC, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';
import { OptionsMenu } from 'packages/common/layout-foundation/options/ui/web';
import { createBoxShadowCss, StyledComponentProps } from 'packages/common/design/ui/web';
import { MenuOptionState } from 'packages/common/layout-foundation/menu/domain';
import { ArrowRightIcon, IconSizes, IconTypes } from 'packages/common/icon/ui/web';
import { useKeyPress } from 'packages/common/layout-foundation/general/ui/all';
import { MenuState } from 'packages/common/layout-foundation/menu/domain/types';

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

type DropdownMenuOptionProps = {
    data: MenuOptionState;
    onChangeData: (option: MenuOptionState) => void;
    renderOption: (option: MenuOptionState) => ReactNode;
    onChooseOption?: (option: MenuOptionState) => void;
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
                    onChangeData={}
                    data={props.data.childMenu}
                    renderOption={props.renderOption}
                    onChooseOption={props.onChooseOption}
                />
            </StyledSubMenuContainer>
        );
    return (
        <div>
            {subMenu}
            <StyledOptionContainer>
                <StyledOptionNameContainer>{props.renderOption(props.data)}</StyledOptionNameContainer>
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

type DropdownMenuProps = {
    data: MenuState;
    onChangeData: (data: MenuState) => void;
    nestingLevel?: number;
    renderHeader?: (focusedOption: null | MenuOptionState, nestingLevel: number) => ReactNode;
    renderOption: (option: MenuOptionState, nestingLevel: number) => ReactNode;
    onChooseOption?: (option: MenuOptionState, nestingLevel: number) => void;
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
                        renderOption={(option) => props.renderOption(option, nestingLevel)}
                        onChooseOption={(option) => {
                            if (props.onChooseOption) {
                                props.onChooseOption(option, nestingLevel);
                            }
                        }}
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
