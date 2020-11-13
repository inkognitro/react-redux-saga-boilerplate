import React, { FC, ReactNode, useState, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import styled from 'styled-components';
import { useDidUpdate, useKeyPress } from 'packages/common/layout-foundation/general/ui/all';
import { StyledComponentProps } from 'packages/common/design/ui/web';

const StyledOptions = styled.div`
    border: 1px solid grey;
    max-height: 200px;
    overflow: auto;
    position: relative;
`;

const StyledOption = styled.div`
    text-align: left;
    padding: 10px 5px;
    cursor: pointer;
    &.focused-f64f7c4f {
        color: white;
        background-color: ${(props: StyledComponentProps) => props.theme.colorPrimary};
    }
`;

type OptionsProps<Option = any> = {
    optionRows: OptionRow[];
    renderOption: (option: Option) => ReactNode;
    onChooseOption?: (option: Option) => void;
};

function getPreviousOptionRowKey(currentKey: string | null, optionRows: OptionRow[]): string | null {
    if (optionRows.length === 0) {
        return null;
    }
    const currentRowIndex = optionRows.findIndex((row) => row.key === currentKey);
    if (currentRowIndex === -1) {
        return optionRows[0].key;
    }
    if (currentRowIndex > 0) {
        return optionRows[currentRowIndex - 1].key;
    }
    return currentKey;
}

function getNextOptionRowKey(currentKey: string | null, optionRows: OptionRow[]): string | null {
    if (optionRows.length === 0) {
        return null;
    }
    const currentRowIndex = optionRows.findIndex((row) => row.key === currentKey);
    if (currentRowIndex === -1) {
        return optionRows[0].key;
    }
    if (currentRowIndex < optionRows.length - 1) {
        return optionRows[currentRowIndex + 1].key;
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

function findFocusedEntry<Entry>(currentKey: string | null, optionRows: OptionRow<Entry>[]): Entry | null {
    if (optionRows.length === 0) {
        return null;
    }
    const currentRowIndex = optionRows.findIndex((row) => row.key === currentKey);
    if (currentRowIndex === -1) {
        return null;
    }
    return optionRows[currentRowIndex].option;
}

const Options: FC<OptionsProps> = (props) => {
    const [focusedRowKey, setFocusedRowKey] = useState<string | null>(null);
    const [ignoreMouseOver, setIgnoreMouseOver] = useState(false);
    const containerElement = useRef<HTMLDivElement>(null);
    const focusedElement = useRef<HTMLDivElement>(null);
    useKeyPress(
        (keyboardKey: string, event: KeyboardEvent | undefined) => {
            if (keyboardKey === 'ArrowUp') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                setIgnoreMouseOver(true);
                setFocusedRowKey(getPreviousOptionRowKey(focusedRowKey, props.optionRows));
                setSelectedOptionsScrollPosition(containerElement.current, focusedElement.current);
            }
            if (keyboardKey === 'ArrowDown') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                setIgnoreMouseOver(true);
                setFocusedRowKey(getNextOptionRowKey(focusedRowKey, props.optionRows));
                setSelectedOptionsScrollPosition(containerElement.current, focusedElement.current);
            }
            if (keyboardKey === 'Enter') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                const focusedEntry = findFocusedEntry(focusedRowKey, props.optionRows);
                if (props.onChooseOption && focusedEntry) {
                    props.onChooseOption(focusedEntry);
                }
            }
        },
        [props.optionRows]
    );
    return (
        <StyledOptions ref={containerElement}>
            {props.optionRows.map((row) => {
                const onClickCallback = () => {
                    if (!props.onChooseOption) {
                        return;
                    }
                    props.onChooseOption(row.option);
                };
                const classNames = [];
                const isFocused = row.key === focusedRowKey;
                if (isFocused) {
                    classNames.push('focused-f64f7c4f');
                }
                const className = classNames.join(' ');
                return (
                    <StyledOption
                        ref={!isFocused ? undefined : focusedElement}
                        onMouseEnter={
                            ignoreMouseOver ? () => setIgnoreMouseOver(false) : () => setFocusedRowKey(row.key)
                        }
                        onClick={onClickCallback}
                        key={row.key}
                        className={className ? className : undefined}>
                        {props.renderOption(row.option)}
                    </StyledOption>
                );
            })}
        </StyledOptions>
    );
};

type OptionRow<Entry = any> = {
    key: string;
    option: Entry;
};

function createOptionRowsFromOptions<Option = any>(options: Option[]): OptionRow<Option>[] {
    return options.map((option) => ({
        key: uuidV4(),
        option: option,
    }));
}

type OptionsMenuProps<Option = any> = {
    options: Option[];
    renderOption: (option: Option) => ReactNode;
    onChooseOption?: (option: Option) => void;
};

export const OptionsMenu: FC<OptionsMenuProps> = (props) => {
    const [optionRows, setEntryRows] = useState(createOptionRowsFromOptions(props.options));
    useDidUpdate(() => setEntryRows(createOptionRowsFromOptions(props.options)), [props.options]);
    return <Options optionRows={optionRows} renderOption={props.renderOption} onChooseOption={props.onChooseOption} />;
};
