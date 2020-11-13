import React, { FC, ReactNode, useState, useRef } from 'react';
import { useKeyPress } from 'packages/common/layout-foundation/general/ui/all';
import { OptionState } from 'packages/common/layout-foundation/options/domain';

function getPreviousOptionKey(currentKey: string | null, options: OptionState[]): string | null {
    if (options.length === 0) {
        return null;
    }
    const currentOptionIndex = options.findIndex((option) => option.key === currentKey);
    if (currentOptionIndex === -1) {
        return options[0].key;
    }
    if (currentOptionIndex > 0) {
        return options[currentOptionIndex - 1].key;
    }
    return currentKey;
}

function getNextOptionKey(currentKey: string | null, options: OptionState[]): string | null {
    if (options.length === 0) {
        return null;
    }
    const currentOptionIndex = options.findIndex((option) => option.key === currentKey);
    if (currentOptionIndex === -1) {
        return options[0].key;
    }
    if (currentOptionIndex < options.length - 1) {
        return options[currentOptionIndex + 1].key;
    }
    return currentKey;
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

function findFocusedOption<OptionData>(
    currentKey: string | null,
    options: OptionState<OptionData>[]
): OptionState<OptionData> | null {
    if (options.length === 0) {
        return null;
    }
    const currentOptionIndex = options.findIndex((option) => option.key === currentKey);
    if (currentOptionIndex === -1) {
        return null;
    }
    return options[currentOptionIndex];
}

type InteractiveOptionsProps<OptionData = any> = {
    options: OptionState<OptionData>[];
    renderOption: (option: OptionState<OptionData>, isFocused: boolean) => ReactNode;
    onChooseOption?: (option: OptionState<OptionData>) => void;
    shouldListenToKeyboardEvents: boolean;
    shouldLooseFocusOnMouseLeave: boolean;
    onChangeFocusedOption?: (option: OptionState<OptionData> | null) => void;
};

export const InteractiveOptions: FC<InteractiveOptionsProps> = (props) => {
    const [focusedOptionKey, setFocusedOptionKey] = useState<string | null>(null);
    const [ignoreMouseOver, setIgnoreMouseOver] = useState(false);
    const containerElement = useRef<HTMLDivElement>(null);
    const focusedElement = useRef<HTMLDivElement>(null);
    function changeFocusedOptionKey(focusedOptionKey: null | string) {
        setFocusedOptionKey(focusedOptionKey);
        if (props.onChangeFocusedOption) {
            if (focusedOptionKey === null) {
                props.onChangeFocusedOption(null);
                return;
            }
            const focusedOption = props.options.find((option) => option.key === focusedOptionKey);
            if (!focusedOption) {
                return;
            }
            props.onChangeFocusedOption(focusedOption);
        }
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
                changeFocusedOptionKey(getPreviousOptionKey(focusedOptionKey, props.options));
                setSelectedOptionsScrollPosition(containerElement.current, focusedElement.current);
            }
            if (keyboardKey === 'ArrowDown') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                setIgnoreMouseOver(true);
                changeFocusedOptionKey(getNextOptionKey(focusedOptionKey, props.options));
                setSelectedOptionsScrollPosition(containerElement.current, focusedElement.current);
            }
            if (keyboardKey === 'Enter') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                const focusedEntry = findFocusedOption(focusedOptionKey, props.options);
                if (props.onChooseOption && focusedEntry) {
                    props.onChooseOption(focusedEntry);
                }
            }
        },
        [props.options, props.shouldListenToKeyboardEvents]
    );
    return (
        <div ref={containerElement}>
            {props.options.map((option) => {
                const isFocused = option.key === focusedOptionKey;
                return (
                    <div
                        ref={!isFocused ? undefined : focusedElement}
                        onMouseEnter={
                            ignoreMouseOver ? () => setIgnoreMouseOver(false) : () => changeFocusedOptionKey(option.key)
                        }
                        onMouseLeave={() => {
                            if (props.shouldLooseFocusOnMouseLeave) {
                                changeFocusedOptionKey(null);
                            }
                        }}
                        onClick={() => {
                            changeFocusedOptionKey(option.key);
                            if (!props.onChooseOption) {
                                return;
                            }
                            props.onChooseOption(option);
                        }}
                        key={option.key}>
                        {props.renderOption(option, isFocused)}
                    </div>
                );
            })}
        </div>
    );
};
