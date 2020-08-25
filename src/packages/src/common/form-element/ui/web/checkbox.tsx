import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { CheckboxState, createChangeFormElementState } from "../../domain";
import {
    ConnectedFormElementFCProps,
    ConnectedFormElementFC,
    FormElementFCCallbacks,
    FormElementFCProps,
    FormElementFCState,
} from "./types";

type CheckboxProps = FormElementFCProps<CheckboxState>
const Checkbox: FC<CheckboxProps> = (props) => {
    const onChange = props.data.readOnly
        ? undefined
        : (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(props.data, {
                value: event.target.checked,
            });
        };
    return (
        <input
            id={props.data.id}
            type="checkbox"
            checked={props.data.value}
            onChange={onChange}
            readOnly={props.data.readOnly}
        />
    );
};

const mapStateToProps = (_: any, props: ConnectedFormElementFCProps<CheckboxState>): FormElementFCState<CheckboxState> => ({
    data: props.data,
});

const mapDispatchToProps = (dispatch: Dispatch): FormElementFCCallbacks<CheckboxState> => ({
    onChange: (state: CheckboxState, stateChanges: Partial<CheckboxState>) => dispatch(
        createChangeFormElementState(state, stateChanges),
    ),
});

export const ConncectedCheckbox: ConnectedFormElementFC<CheckboxState> = connect(
    mapStateToProps, mapDispatchToProps,
)(Checkbox);
