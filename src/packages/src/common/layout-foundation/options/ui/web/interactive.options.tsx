import React, { FC, ReactNode, useState, useRef } from 'react';
import { useKeyPress } from 'packages/common/layout-foundation/general/ui/all';
import { OptionState } from 'packages/common/layout-foundation/options/domain';

function getPreviousOptionToFocus(options: OptionState[]): OptionState | null {
    if (options.length === 0) {
        return null;
    }
    const focusedOption = findFocusedOption(options);
    if (!focusedOption) {
        return options[0];
    }
    const focusedOptionIndex = options.findIndex((option) => option.key === focusedOption.key);
    if (focusedOptionIndex > 0) {
        return options[focusedOptionIndex - 1];
    }
    return focusedOption;
}

function getNextOptionToFocus(options: OptionState[]): OptionState | null {
    if (options.length === 0) {
        return null;
    }
    const focusedOption = findFocusedOption(options);
    if (!focusedOption) {
        return options[0];
    }
    const focusedOptionIndex = options.findIndex((option) => option.key === focusedOption.key);
    if (focusedOptionIndex === -1) {
        return options[0];
    }
    if (focusedOptionIndex < options.length - 1) {
        return options[focusedOptionIndex + 1];
    }
    return focusedOption;
}

function setSelectedOptionsScrollPosition(
    containerElement: HTMLDivElement | null,
    focusedElement: HTMLDivElement | null
): void {
    if (!containerElement || !focusedElement) {
        return;
    }
    const isFocusedElementAboveContainerTop = focusedElement.offsetTop < containerElement.scrollTop;
    if (isFocusedElementAboveContainerTop) {
        focusedElement.scrollIntoView({ block: 'start' });
        return;
    }
    const containerBottom = containerElement.scrollTop + containerElement.clientHeight;
    const focusedElementBottom = focusedElement.offsetTop + focusedElement.clientHeight;
    const isFocusedElementBelowContainerBottom = focusedElementBottom < containerBottom;
    if (isFocusedElementBelowContainerBottom) {
        focusedElement.scrollIntoView({ block: 'start' });
        return;
    }
}

function findFocusedOption<OptionData>(options: OptionState<OptionData>[]): OptionState<OptionData> | null {
    if (options.length === 0) {
        return null;
    }
    const focusedOption = options.find((option) => option.isFocused);
    return !focusedOption ? null : focusedOption;
}

type InteractiveOptionsProps<OptionData = any> = {
    options: OptionState<OptionData>[];
    onChangeOptions: (options: OptionState<OptionData>[]) => void;
    renderOption: (option: OptionState<OptionData>) => ReactNode;
    onChooseOption?: (option: OptionState<OptionData>) => void;
    shouldListenToKeyboardEvents: boolean;
    shouldLooseFocusOnMouseLeave: boolean;
};

export const InteractiveOptions: FC<InteractiveOptionsProps> = (props) => {
    const [ignoreMouseOver, setIgnoreMouseOver] = useState(false);
    const containerElement = useRef<HTMLDivElement>(null);
    const focusedElement = useRef<HTMLDivElement>(null);
    function changeFocusedOption(focusedOption: OptionState | null) {
        props.onChangeOptions(
            props.options.map((option) => {
                if (focusedOption && focusedOption.key === option.key) {
                    return {
                        ...option,
                        isFocused: true,
                    };
                }
                return {
                    ...option,
                    isFocused: false,
                };
            })
        );
    }
    useKeyPress(
        (keyboardKey: string, event: KeyboardEvent | undefined) => {
            if (!props.shouldListenToKeyboardEvents) {
                return;
            }
            if (keyboardKey === 'ArrowUp') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                setIgnoreMouseOver(true);
                changeFocusedOption(getPreviousOptionToFocus(props.options));
                setSelectedOptionsScrollPosition(containerElement.current, focusedElement.current);
            }
            if (keyboardKey === 'ArrowDown') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                setIgnoreMouseOver(true);
                changeFocusedOption(getNextOptionToFocus(props.options));
                setSelectedOptionsScrollPosition(containerElement.current, focusedElement.current);
            }
            if (keyboardKey === 'Enter') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                const focusedEntry = findFocusedOption(props.options);
                if (props.onChooseOption && focusedEntry) {
                    props.onChooseOption(focusedEntry);
                }
            }
        },
        [props.options, props.shouldListenToKeyboardEvents]
    );
    const focusedOption = props.options.find((option) => option.isFocused);
    return (
        <div ref={containerElement}>
            {props.options.map((option) => {
                const isFocused = option.key === (focusedOption && focusedOption.key);
                return (
                    <div
                        ref={!isFocused ? undefined : focusedElement}
                        onMouseEnter={
                            ignoreMouseOver ? () => setIgnoreMouseOver(false) : () => changeFocusedOption(option)
                        }
                        onMouseLeave={() => {
                            if (props.shouldLooseFocusOnMouseLeave) {
                                changeFocusedOption(null);
                            }
                        }}
                        onClick={() => {
                            changeFocusedOption(option);
                            if (!props.onChooseOption) {
                                return;
                            }
                            props.onChooseOption(option);
                        }}
                        key={option.key}>
                        {props.renderOption(option)}
                    </div>
                );
            })}
        </div>
    );
};
