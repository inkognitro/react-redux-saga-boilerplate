import React, { FC, ReactNode, useState, DependencyList, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import styled from 'styled-components';
import { useDidUpdate } from 'packages/common/layout-foundation/general/ui/all';

const StyledEntries = styled.div`
    border: 1px solid grey;
`;

const StyledEntry = styled.div`
    text-align: left;
    padding: 15px;
`;

type EntriesProps<Entry = any> = {
    entryRows: EntryRow[];
    renderEntry: (entry: Entry) => ReactNode;
};

function useKeyPress(fn: (keyboardKey: string, event: KeyboardEvent | undefined) => void, deps: DependencyList): void {
    const [currentKeyPressId, setCurrentKeyPressId] = useState<string | null>(null);
    function triggerCallbackFromKeyPress(keyboardKey: string, keyPressId: string) {
        setTimeout(() => {
            if (keyPressId !== currentKeyPressId) {
                return;
            }
            fn(keyboardKey, undefined);
            triggerCallbackFromKeyPress(keyboardKey, keyPressId);
        }, 200);
    }
    function downHandler(event: KeyboardEvent) {
        const keyPressId = uuidV4();
        setCurrentKeyPressId(keyPressId);
        fn(event.key, event);
        setTimeout(() => triggerCallbackFromKeyPress(event.key, keyPressId), 1000);
    }
    const upHandler = () => {
        setCurrentKeyPressId(null);
    };
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, deps);
}

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
            console.log('key press: ' + keyboardKey);
        },
        [props.entryRows]
    );
    return (
        <StyledEntries>
            {props.entryRows.map((row) => {
                const classNames = [];
                if (focusedRowKey === row.key) {
                    classNames.push('focused');
                }
                const className = classNames.join(' ');
                return (
                    <StyledEntry key={row.key} className={className ? className : undefined}>
                        {props.renderEntry(row.entry)} {row.key === focusedRowKey && 'focused!'}
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
};

export const DropdownMenu: FC<DropdownMenuProps> = (props) => {
    const [entryRows, setEntryRows] = useState(createEntryRowsFromEntries(props.entries));
    useDidUpdate(() => setEntryRows(createEntryRowsFromEntries(props.entries)), [props.entries]);
    return <Entries entryRows={entryRows} renderEntry={props.renderEntry} />;
};
