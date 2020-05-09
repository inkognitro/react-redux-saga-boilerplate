import React, { FC } from "react";
import { FormElementTypes, InputFieldState } from "Common/Domain/FormUtils/FormElements/Types";
import { Messages } from "Common/UI/FormUtils/FormElements/Messages";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createChangeFormElementState } from "Common/Domain/FormUtils/FormElements/Command/ChangeFormElementState";
import {
    ConnectedFormElementComponentProps,
    FormElementComponentCallbacks,
    FormElementComponentProps,
    FormElementComponentState,
} from "Common/UI/FormUtils/FormElements/Types";

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

export const InternalInputField: FC<FormElementComponentProps<InputFieldState>> = (props) => {
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
            <Messages messages={props.data.messages} />
        </React.Fragment>
    );
};

const mapStateToProps = (
    rootState: any, props: ConnectedFormElementComponentProps<InputFieldState>,
): FormElementComponentState<InputFieldState> => ({
    data: props.getData(rootState),
});

const mapDispatchToProps = (dispatch: Dispatch): FormElementComponentCallbacks<InputFieldState> => ({
    onChange: (state: InputFieldState, stateChanges: Partial<InputFieldState>) => dispatch(
        createChangeFormElementState(state, stateChanges),
    ),
});

export const ConnectedInternalInputField = connect(mapStateToProps, mapDispatchToProps)(InternalInputField);