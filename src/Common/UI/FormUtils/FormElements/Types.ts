export type FormElementComponentState<Data> = {
    data: Data
}

export type FormElementComponentCallbacks<Data> = {
    onChange(state: Data, stateChanges: Partial<Data>): void
}

export type FormElementComponentProps<Data> = (FormElementComponentState<Data> & FormElementComponentCallbacks<Data>)

export type ConnectedFormElementComponentProps<Data> = {
    data: Data
}
