import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { createBoxShadowCss, StyledComponentProps } from 'packages/common/design/ui/web';
import { findFocusedOption, MenuState, OptionState } from 'packages/common/layout-foundation/menu/domain';
import { ArrowRightIcon, IconSizes, IconTypes } from 'packages/common/icon/ui/web';
import { OptionsMenu } from './options.menu';

type CommonInternalProps = {
    nestingLevel: number;
    renderHeader?: (focusedOption: null | OptionState, nestingLevel: number) => ReactNode;
    renderOption: (option: OptionState, nestingLevel: number) => ReactNode;
    onClickOption?: (option: OptionState, nestingLevel: number) => void;
    onMouseEnterOption?: (option: OptionState, nestingLevel: number) => void;
    onMouseLeaveOption?: (option: OptionState, nestingLevel: number) => void;
    visibleMenuNestingLevel?: number;
};

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
    white-space: pre;
`;

const StyledOptionIconContainer = styled.div`
    display: table-cell;
    text-align: right;
`;

type InternalClassicMultiLevelMenuOptionProps = CommonInternalProps & {
    data: OptionState;
};

const InternalClassicMultiLevelMenuOption: FC<InternalClassicMultiLevelMenuOptionProps> = (props) => {
    const subMenu =
        !props.data.childMenu ||
        !props.data.childMenu.isVisible ||
        !props.data.childMenu.options.length ||
        (props.visibleMenuNestingLevel !== undefined && props.visibleMenuNestingLevel < props.nestingLevel) ||
        !props.data.isFocused ? null : (
            <StyledSubMenuContainer>
                <InternalClassicMultiLevelMenu
                    data={props.data.childMenu}
                    nestingLevel={props.nestingLevel + 1}
                    renderOption={props.renderOption}
                    renderHeader={props.renderHeader}
                    onClickOption={props.onClickOption}
                    onMouseEnterOption={props.onMouseEnterOption}
                    onMouseLeaveOption={props.onMouseLeaveOption}
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
                {props.data.childMenu && props.data.childMenu.options.length > 0 && (
                    <StyledOptionIconContainer>
                        <ArrowRightIcon size={IconSizes.SM} type={IconTypes.INTERACTIVE} />
                    </StyledOptionIconContainer>
                )}
            </StyledOptionContainer>
        </div>
    );
};

const StyledMultiLevelMenu = styled.div`
    position: relative;
    ${createBoxShadowCss()}
    border: 1px solid ${(props: StyledComponentProps) => props.theme.colorSmoothLineOnWhite};
`;

type InternalClassicMultiLevelMenuProps = CommonInternalProps & {
    data: MenuState;
};

export const InternalClassicMultiLevelMenu: FC<InternalClassicMultiLevelMenuProps> = (props) => {
    if (!props.data.isVisible) {
        return null;
    }
    const nestingLevel = props.nestingLevel === undefined ? 0 : props.nestingLevel;
    const header = props.renderHeader && props.renderHeader(findFocusedOption(props.data.options), nestingLevel);
    return (
        <StyledMultiLevelMenu>
            {header}
            <OptionsMenu
                renderOption={(option) => (
                    <InternalClassicMultiLevelMenuOption
                        renderOption={props.renderOption}
                        nestingLevel={props.nestingLevel}
                        data={option}
                        onMouseEnterOption={props.onMouseEnterOption}
                        onMouseLeaveOption={props.onMouseLeaveOption}
                        onClickOption={props.onClickOption}
                        renderHeader={props.renderHeader}
                        visibleMenuNestingLevel={props.visibleMenuNestingLevel}
                    />
                )}
                options={props.data.options}
                onClickOption={(subOption) => {
                    if (props.onClickOption) {
                        props.onClickOption(subOption, props.nestingLevel);
                    }
                }}
                onMouseEnterOption={(subOption) => {
                    if (props.onMouseEnterOption) {
                        props.onMouseEnterOption(subOption, props.nestingLevel);
                    }
                }}
                onMouseLeaveOption={(subOption) => {
                    if (props.onMouseLeaveOption) {
                        props.onMouseLeaveOption(subOption, props.nestingLevel);
                    }
                }}
            />
        </StyledMultiLevelMenu>
    );
};
