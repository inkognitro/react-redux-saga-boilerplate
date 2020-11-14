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
    onChangeOptions: (options: OptionState<OptionData>[]) => void;
    renderOption: (option: OptionState<OptionData>) => ReactNode;
    onChooseOption?: (option: OptionState<OptionData>) => void;
    shouldListenToKeyboardEvents?: boolean;
    shouldLooseFocusOnMouseLeave?: boolean;
};

export const OptionsMenu: FC<OptionsMenuProps> = (props) => {
    return (
        <StyledOptionMenu>
            <InteractiveOptions
                shouldListenToKeyboardEvents={!!props.shouldListenToKeyboardEvents}
                shouldLooseFocusOnMouseLeave={!!props.shouldLooseFocusOnMouseLeave}
                options={props.options}
                onChangeOptions={props.onChangeOptions}
                onChooseOption={(option: OptionState) => {
                    if (!props.onChooseOption) {
                        return;
                    }
                    props.onChooseOption(option);
                }}
                renderOption={(option) => {
                    const classNames = ['option-f64f7c4f'];
                    if (option.isSelected) {
                        classNames.push('option-selected-f64f7c4f');
                    }
                    if (option.isFocused) {
                        classNames.push('option-focused-f64f7c4f');
                    }
                    return <div className={classNames.join(' ')}>{props.renderOption(option)}</div>;
                }}
            />
        </StyledOptionMenu>
    );
};
