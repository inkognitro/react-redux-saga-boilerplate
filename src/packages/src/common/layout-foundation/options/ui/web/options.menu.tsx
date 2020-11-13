import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { StyledComponentProps } from 'packages/common/design/ui/web';
import { OptionState } from 'packages/common/layout-foundation/options/domain';
import { InteractiveOptions } from './interactive.options';

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

type OptionsMenuProps<OptionData = any> = {
    options: OptionState<OptionData>[];
    renderOption: (option: OptionState<OptionData>, isFocused: boolean) => ReactNode;
    onChooseOption?: (option: OptionState<OptionData>) => void;
    shouldListenToKeyboardEvents: boolean;
};

export const OptionsMenu: FC<OptionsMenuProps> = (props) => {
    return (
        <StyledOptionMenu>
            <InteractiveOptions
                shouldListenToKeyboardEvents={props.shouldListenToKeyboardEvents}
                options={props.options}
                onChooseOption={(option: OptionState) => {
                    if (!props.onChooseOption) {
                        return;
                    }
                    props.onChooseOption(option);
                }}
                renderOption={(option, isFocused) => {
                    const classNames = ['option-f64f7c4f'];
                    if (option.isSelected) {
                        classNames.push('option-selected-f64f7c4f');
                    }
                    if (isFocused) {
                        classNames.push('option-focused-f64f7c4f');
                    }
                    return (
                        <div className={classNames.join(' ')}>
                            {props.renderOption(option, isFocused)}
                        </div>
                    );
                }}
            />
        </StyledOptionMenu>
    );
};
