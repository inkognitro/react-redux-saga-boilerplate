export type FormElementWCState<Data> = {
    data: Data
}

export type FormElementWCCallbacks<Data> = {
    onChange(state: Data, stateChanges: Partial<Data>): void
}

export type FormElementWCProps<Data> = (FormElementWCState<Data> & FormElementWCCallbacks<Data>)

export type ConnectedFormElementWCProps<Data> = { data: Data }
