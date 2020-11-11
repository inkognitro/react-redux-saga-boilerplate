import React, { FC, ReactNode, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import styled from 'styled-components';
import { useDidUpdate, useKeyPress } from 'packages/common/layout-foundation/general/ui/all';
import { StyledComponentProps } from 'packages/common/design/ui/web';

const StyledEntries = styled.div`
    border: 1px solid grey;
    max-height: 200px;
    overflow: auto;
`;

const StyledEntry = styled.div`
    text-align: left;
    padding: 10px 5px;
    cursor: pointer;
    &.focused-f64f7c4f {
        color: white;
        background-color: ${(props: StyledComponentProps) => props.theme.colorPrimary};
    }
`;

type EntriesProps<Entry = any> = {
    entryRows: EntryRow[];
    renderEntry: (entry: Entry) => ReactNode;
    onChooseEntry?: (entry: Entry) => void;
};

function getPreviousEntryRowKey(currentKey: string | null, entryRows: EntryRow[]): string | null {
    if (entryRows.length === 0) {
        return null;
    }
    const currentRowIndex = entryRows.findIndex((row) => row.key === currentKey);
    if (currentRowIndex === -1) {
        return entryRows[0].key;
    }
    if (currentRowIndex > 0) {
        return entryRows[currentRowIndex - 1].key;
    }
    return currentKey;
}

function getNextEntryRowKey(currentKey: string | null, entryRows: EntryRow[]): string | null {
    if (entryRows.length === 0) {
        return null;
    }
    const currentRowIndex = entryRows.findIndex((row) => row.key === currentKey);
    if (currentRowIndex === -1) {
        return entryRows[0].key;
    }
    if (currentRowIndex < entryRows.length - 1) {
        return entryRows[currentRowIndex + 1].key;
    }
    return currentKey;
}

const Entries: FC<EntriesProps> = (props) => {
    const [focusedRowKey, setFocusedRowKey] = useState<string | null>(null);
    useKeyPress(
        (keyboardKey: string, event: KeyboardEvent | undefined) => {
            if (keyboardKey === 'ArrowUp') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                setFocusedRowKey(getPreviousEntryRowKey(focusedRowKey, props.entryRows));
            }
            if (keyboardKey === 'ArrowDown') {
                if (event) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                setFocusedRowKey(getNextEntryRowKey(focusedRowKey, props.entryRows));
            }
        },
        [props.entryRows]
    );
    return (
        <StyledEntries>
            {props.entryRows.map((row) => {
                const onClickCallback = () => {
                    if (!props.onChooseEntry) {
                        return;
                    }
                    props.onChooseEntry(row.entry);
                };
                const classNames = [];
                if (row.key === focusedRowKey) {
                    classNames.push('focused-f64f7c4f');
                }
                const className = classNames.join(' ');
                return (
                    <StyledEntry
                        onMouseOver={() => setFocusedRowKey(row.key)}
                        onClick={onClickCallback}
                        key={row.key}
                        className={className ? className : undefined}>
                        {props.renderEntry(row.entry)}
                    </StyledEntry>
                );
            })}
        </StyledEntries>
    );
};

type EntryRow<Entry = any> = {
    key: string;
    entry: Entry;
};

function createEntryRowsFromEntries<Entry = any>(entries: Entry[]): EntryRow<Entry>[] {
    return entries.map((entry) => ({
        key: uuidV4(),
        entry: entry,
    }));
}

type DropdownMenuProps<Entry = any> = {
    entries: Entry[];
    renderEntry: (entry: Entry) => ReactNode;
    onChooseEntry?: (entry: Entry) => void;
};

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
    const [entryRows, setEntryRows] = useState(createEntryRowsFromEntries(props.entries));
    useDidUpdate(() => setEntryRows(createEntryRowsFromEntries(props.entries)), [props.entries]);
    return <Entries entryRows={entryRows} renderEntry={props.renderEntry} onChooseEntry={props.onChooseEntry} />;
};
