import { EmailFieldState } from "Common/Domain/FormElements/Types";
import { Dispatch } from "redux";
import { createChangeFormElementState } from "Common/Domain/FormElements/Command/ChangeFormElementState";
import { connect } from "react-redux";
import { DumbInputField, DumbInputFieldCallbacks, DumbInputFieldState } from "Common/UI/FormElements/DumbInputField";

type TextFieldProps = {
    getState: (rootState: any) => EmailFieldState
};

const mapStateToProps = (rootState: any, props: TextFieldProps): DumbInputFieldState => ({
    data: props.getState(rootState),
});

const mapDispatchToProps = (dispatch: Dispatch): DumbInputFieldCallbacks => ({
    onChange: (textFieldState: EmailFieldState, textFieldStateChanges: Partial<EmailFieldState>) => dispatch(
        createChangeFormElementState(textFieldState, textFieldStateChanges),
    ),
});

export const EmailField = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DumbInputField);
