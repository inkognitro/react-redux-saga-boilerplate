import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { createBoxShadowCss, StyledComponentProps } from 'packages/common/design/ui/web';
import { findInFocusPathOption, MenuState, OptionState } from 'packages/common/layout-foundation/menu/domain';
import { ArrowRightIcon, IconSizes, IconTypes } from 'packages/common/icon/ui/web';
import { OptionHandleProps, OptionsMenu } from './options.menu';

type CommonInternalProps = {
    nestingLevel: number;
    renderOption: (option: OptionState, nestingLevel: number) => ReactNode;
    renderHeader?: (inFocusPathOption: null | OptionState, nestingLevel: number) => ReactNode;
    onClickOption?: (option: OptionState, nestingLevel: number) => void;
    onMouseEnterOption?: (option: OptionState, nestingLevel: number) => void;
    onMouseLeaveOption?: (option: OptionState, nestingLevel: number) => void;
    visibleMenuNestingLevel?: number;
};

const StyledSubMenuContainer = styled.div`
    position: absolute;
    left: 100%;
    top: 0px;
`;

const StyledMenuHeaderContainer = styled.div`
    background-color: white;
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
    optionHandleProps: OptionHandleProps;
};

const InternalClassicMultiLevelMenuOption: FC<InternalClassicMultiLevelMenuOptionProps> = (props) => {
    const subMenuNestingLevel = props.nestingLevel + 1;
    const subMenu =
        !props.data.childMenu ||
        !props.data.childMenu.isVisible ||
        !props.data.childMenu.options.length ||
        (props.visibleMenuNestingLevel !== undefined && props.visibleMenuNestingLevel < subMenuNestingLevel) ||
        !props.data.isInFocusPath ? null : (
            <StyledSubMenuContainer>
                <InternalClassicMultiLevelMenu
                    data={props.data.childMenu}
                    visibleMenuNestingLevel={props.visibleMenuNestingLevel}
                    nestingLevel={subMenuNestingLevel}
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
            <StyledOptionContainer {...props.optionHandleProps}>
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
    const header = props.renderHeader && (
        <StyledMenuHeaderContainer>
            {props.renderHeader(findInFocusPathOption(props.data.options), nestingLevel)}
        </StyledMenuHeaderContainer>
    );
    return (
        <StyledMultiLevelMenu>
            {header}
            <OptionsMenu
                renderOption={(option, handleProps) => (
                    <InternalClassicMultiLevelMenuOption
                        data={option}
                        nestingLevel={props.nestingLevel}
                        renderOption={props.renderOption}
                        optionHandleProps={handleProps}
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
