import React, { FC, ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { OptionsMenu } from 'packages/common/layout-foundation/options/ui/web';
import { createBoxShadowCss, StyledComponentProps } from 'packages/common/design/ui/web';
import { DropdownOptionState } from 'packages/common/layout-foundation/dropdown-menu/domain';
import { useOnClickOutside } from 'packages/common/layout-foundation/general/ui/all';
import { ArrowRightIcon, IconSizes, IconTypes } from 'packages/common/icon/ui/web';

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

type DropdownMenuOptionProps<OptionData = any> = {
    data: DropdownOptionState<OptionData>;
    isFocused: boolean;
    renderOption: (option: DropdownOptionState<OptionData>) => ReactNode;
    onChooseOption?: (option: DropdownOptionState<OptionData>) => void;
    onToggleSubMenu: (state: boolean) => void;
    isSubMenuVisible: boolean;
};

export const DropdownMenuOption: FC<DropdownMenuOptionProps> = (props) => {
    const optionRef = useRef<any>();
    useOnClickOutside(optionRef, () => props.onToggleSubMenu(false));
    const childrenOptions = props.data.data.children;
    const subMenu =
        !childrenOptions || !childrenOptions.length || !props.isSubMenuVisible ? null : (
            <StyledSubMenuContainer>
                <DropdownMenu
                    renderOption={props.renderOption}
                    onChooseOption={props.onChooseOption}
                    options={childrenOptions}
                    isFocused={props.isFocused}
                />
            </StyledSubMenuContainer>
        );
    return (
        <div ref={optionRef}>
            {subMenu}
            <StyledOptionContainer onClick={() => props.onToggleSubMenu(props.isSubMenuVisible)}>
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

type DropdownMenuProps<OptionData = any> = {
    isFocused?: boolean;
    options: DropdownOptionState<OptionData>[];
    renderOption: (option: DropdownOptionState<OptionData>) => ReactNode;
    onChooseOption?: (option: DropdownOptionState<OptionData>) => void;
    onClickOutside?: () => void;
};

const StyledDropdownMenu = styled.div`
    position: relative;
    ${createBoxShadowCss()}
    border: 1px solid ${(props: StyledComponentProps) => props.theme.colorSmoothLineOnWhite};
`;

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
    const menuRef = useRef<any>();
    useOnClickOutside(menuRef, () => {
        if (props.onClickOutside) {
            props.onClickOutside();
        }
    });
    return (
        <StyledDropdownMenu ref={menuRef}>
            <OptionsMenu
                options={props.options.map((dpOption) => dpOption)}
                renderOption={(option: DropdownOptionState, isFocused) => (
                    <DropdownMenuOption
                        isSubMenuVisible={isFocused}
                        onToggleSubMenu={() => console.log('toogle')}
                        data={option}
                        isFocused={isFocused}
                        renderOption={props.renderOption}
                        onChooseOption={props.onChooseOption}
                    />
                )}
                shouldListenToKeyboardEvents={!!props.isFocused}
                onChooseOption={(option) => {
                    if (!props.onChooseOption || option.data.children.length > 0) {
                        return;
                    }
                    props.onChooseOption(option);
                }}
            />
        </StyledDropdownMenu>
    );
};
