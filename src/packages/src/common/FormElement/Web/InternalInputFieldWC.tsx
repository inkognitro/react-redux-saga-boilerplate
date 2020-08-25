import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    FormElementTypes,
    InputFieldState,
    createChangeFormElementState,
} from "../Domain";
import {
    ConnectedFormElementFCProps,
    ConnectedFormElementFC,
    FormElementFCCallbacks,
    FormElementFCState,
    FormElementFCProps,
} from "./Types";

function createHtmlInputTypeByTextFieldType(type: FormElementTypes): string {
    if (type === FormElementTypes.TEXT) {
        return "text";
    }
    if (type === FormElementTypes.PASSWORD) {
        return "password";
    }
    if (type === FormElementTypes.EMAIL) {
        return "email";
    }
    throw new Error(`Form element type "${type}" not supported!`);
}

export const InternalInputFieldWC: FC<FormElementFCProps<InputFieldState>> = (props) => {
    const onChange = props.data.readOnly
        ? undefined
        : (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(props.data, {
                value: event.target.value,
            });
        };
    return (
        <input
            id={props.data.id}
            className="form-control"
            type={createHtmlInputTypeByTextFieldType(props.data.type)}
            value={props.data.value}
            onChange={onChange}
            readOnly={props.data.readOnly}
        />
    );
};

const mapStateToProps = (_: any, props: ConnectedFormElementFCProps<InputFieldState>): FormElementFCState<InputFieldState> => ({
    data: props.data,
});

const mapDispatchToProps = (dispatch: Dispatch): FormElementFCCallbacks<InputFieldState> => ({
    onChange: (state: InputFieldState, stateChanges: Partial<InputFieldState>) => dispatch(
        createChangeFormElementState(state, stateChanges),
    ),
});

export const ConnectedInternalInputFieldWC: ConnectedFormElementFC<InputFieldState> = connect(
    mapStateToProps, mapDispatchToProps,
)(InternalInputFieldWC);
