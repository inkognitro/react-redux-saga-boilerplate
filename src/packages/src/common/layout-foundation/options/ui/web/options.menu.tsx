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
    renderOptionData: (optionData: OptionData) => ReactNode;
    onChooseOption?: (option: OptionState<OptionData>) => void;
    shouldListenToKeyboardEvents: boolean;
};

export const OptionsMenu: FC<OptionsMenuProps> = (props) => {
    return (
        <StyledOptionMenu>
            <InteractiveOptions
                shouldListenToKeyboardEvents={true}
                options={props.options}
                onChooseOption={props.onChooseOption}
                renderOption={(option: OptionState, isFocused: boolean) => {
                    const classNames = ['option-f64f7c4f'];
                    if (isFocused) {
                        classNames.push('option-focused-f64f7c4f');
                    }
                    if (option.isSelected) {
                        classNames.push('option-selected-f64f7c4f');
                    }
                    return <div className={classNames.join(' ')}>{props.renderOptionData(option.data)}</div>;
                }}
            />
        </StyledOptionMenu>
    );
};
