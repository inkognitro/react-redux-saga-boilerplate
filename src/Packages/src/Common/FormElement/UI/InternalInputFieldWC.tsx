import React, { FC } from "react";
import {
    FormElementTypes,
    InputFieldState,
    createChangeFormElementState,
    MessagesWC,
} from "Packages/Common/FormElement";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    ConnectedFormElementWCProps,
    FormElementWCCallbacks,
    FormElementWCProps,
    FormElementWCState,
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

const InternalInputFieldWC: FC<FormElementWCProps<InputFieldState>> = (props) => {
    const onChange = props.data.readOnly
        ? undefined
        : (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(props.data, {
                value: event.target.value,
            });
        };
    return (
        <React.Fragment>
            <input
                id={props.data.id}
                className="form-control"
                type={createHtmlInputTypeByTextFieldType(props.data.type)}
                value={props.data.value}
                onChange={onChange}
                readOnly={props.data.readOnly}
            />
            <MessagesWC messages={props.data.messages} />
        </React.Fragment>
    );
};

const mapStateToProps = (_: any, props: ConnectedFormElementWCProps<InputFieldState>): FormElementWCState<InputFieldState> => ({
    data: props.data,
});

const mapDispatchToProps = (dispatch: Dispatch): FormElementWCCallbacks<InputFieldState> => ({
    onChange: (state: InputFieldState, stateChanges: Partial<InputFieldState>) => dispatch(
        createChangeFormElementState(state, stateChanges),
    ),
});

export const ConnectedInternalInputFieldWC = connect(mapStateToProps, mapDispatchToProps)(InternalInputFieldWC);
