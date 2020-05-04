import React, { FC } from "react";
import { FormElementTypes ,TextFieldState } from "Common/Domain/FormElements/Types";
import { Messages } from "Common/UI/Form/Messages";
import { Dispatch } from "redux";
import { connect } from "react-redux";

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

type DumbTextFieldCallbacks<InputFieldState> = {
  onChange(formElementId: string, state: InputFieldState): void;
};

type DumbInputFieldProps<InputFieldState> = DumbTextFieldCallbacks<InputFieldState> & {
  data: InputFieldState;
};

const DumbInputField: FC<DumbInputFieldProps> = (props) => {
    const onChange = props.data.readOnly
        ? undefined
        : (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(props.data.id, {
                ...props.data,
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
    rootState: object,
    props: { stateSelector: (rootState: object) => TextFieldState },
): { data: TextFieldState } => ({
    data: props.stateSelector(rootState),
});

const mapDispatchToProps = (dispatch: Dispatch): DumbTextFieldCallbacks => ({
    onChange: (textFieldId: string, textFieldState: TextFieldState) => dispatch(
        createTextFieldStateWasChanged(textFieldId, textFieldState),
    ),
});

export const InputFieldHelper = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DumbTextField);
