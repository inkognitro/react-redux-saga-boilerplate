import { FC } from 'react';
import { BasicFormElementState } from "../Domain";

export type FormElementFCState<Data> = {
    data: Data
}

export type FormElementFCCallbacks<Data> = {
    onChange(state: Data, stateChanges: Partial<Data>): void
}

export type FormElementFCProps<Data> = (FormElementFCState<Data> & FormElementFCCallbacks<Data>)
export type FormElementFC<Data extends BasicFormElementState = BasicFormElementState> = FC<FormElementFCProps<Data>>

export type ConnectedFormElementFCProps<Data> = { data: Data }
export type ConnectedFormElementFC<Data extends BasicFormElementState = BasicFormElementState> = (
    FC<ConnectedFormElementFCProps<Data>>
)
