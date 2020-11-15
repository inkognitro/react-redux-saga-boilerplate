import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { StyledComponentProps } from 'packages/common/design/ui/web';
import { OptionState } from 'packages/common/layout-foundation/menu/domain';

const StyledOptionMenu = styled.div`
    position: relative;
    .option-f64f7c4f {
        margin-top: 1px;
        background-color: white;
        transition: all 0.2s ease;
        text-align: left;
        padding: 8px;
        cursor: pointer;
        &.option-focused-f64f7c4f {
            transition: all 0.2s ease;
            background-color: #f8f9fa;
        }
        &.option-selected-f64f7c4f {
            background-color: #f8f9fa;
            color: ${(props: StyledComponentProps) => props.theme.colorPrimary};
        }
        &:first-child {
            margin-top: 0px;
        }
    }
`;

type OptionsMenuProps = {
    options: OptionState[];
    renderOption: (option: OptionState) => ReactNode;
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
                if (option.isFocused) {
                    classNames.push('option-focused-f64f7c4f');
                }
                return (
                    <div
                        className={classNames.join(' ')}
                        onMouseEnter={() => {
                            if (props.onMouseEnterOption) {
                                props.onMouseEnterOption(option);
                            }
                        }}
                        onMouseLeave={() => {
                            if (props.onMouseLeaveOption) {
                                props.onMouseLeaveOption(option);
                            }
                        }}
                        onClick={() => {
                            if (props.onClickOption) {
                                props.onClickOption(option);
                            }
                        }}
                        key={option.key}>
                        {props.renderOption(option)}
                    </div>
                );
            })}
        </StyledOptionMenu>
    );
};
