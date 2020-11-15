import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { StyledComponentProps } from 'packages/common/design/ui/web';
import { OptionState } from 'packages/common/layout-foundation/menu/domain';

const StyledOptionMenu = styled.div`
    position: relative;
    .option-f64f7c4f {
        background-color: white;
        transition: all 0.2s ease;
        text-align: left;
        cursor: pointer;
        &.option-in-focus-path-f64f7c4f {
            transition: all 0.2s ease;
            background-color: #f8f9fa;
        }
        &.option-selected-f64f7c4f {
            background-color: #f8f9fa;
            color: ${(props: StyledComponentProps) => props.theme.colorPrimary};
        }
    }
`;

export type OptionHandleProps = {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
};

type OptionsMenuProps = {
    options: OptionState[];
    renderOption: (option: OptionState, optionHandleProps: OptionHandleProps) => ReactNode;
    onClickOption?: (option: OptionState) => void;
    onMouseEnterOption?: (option: OptionState) => void;
    onMouseLeaveOption?: (option: OptionState) => void;
};

export const OptionsMenu: FC<OptionsMenuProps> = (props) => {
    return (
        <StyledOptionMenu>
            {props.options.map((option) => {
                const classNames = ['option-f64f7c4f'];
                if (option.isSelected) {
                    classNames.push('option-selected-f64f7c4f');
                }
                if (option.isInFocusPath) {
                    classNames.push('option-in-focus-path-f64f7c4f');
                }
                let optionHandleProps = {};
                if (props.onMouseEnterOption) {
                    // @ts-ignore
                    optionHandleProps.onMouseEnter = () => props.onMouseEnterOption(option);
                }
                if (props.onMouseLeaveOption) {
                    // @ts-ignore
                    optionHandleProps.onMouseLeave = () => props.onMouseLeaveOption(option);
                }
                if (props.onClickOption) {
                    // @ts-ignore
                    optionHandleProps.onClick = () => props.onClickOption(option);
                }
                return (
                    <div className={classNames.join(' ')} key={option.key}>
                        {props.renderOption(option, optionHandleProps)}
                    </div>
                );
            })}
        </StyledOptionMenu>
    );
};
