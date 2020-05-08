import { TextFieldState } from "Common/Domain/FormElements/Types";
import { Dispatch } from "redux";
import { createChangeFormElementState } from "Common/Domain/FormElements/Command/ChangeFormElementState";
import { connect } from "react-redux";
import { DumbInputField, DumbInputFieldCallbacks, DumbInputFieldState } from "Common/UI/FormElements/DumbInputField";

type TextFieldProps = {
    getState: (rootState: any) => TextFieldState
};

const mapStateToProps = (rootState: any, props: TextFieldProps): DumbInputFieldState => ({
    data: props.getState(rootState),
});

const mapDispatchToProps = (dispatch: Dispatch): DumbInputFieldCallbacks => ({
    onChange: (textFieldState: TextFieldState, textFieldStateChanges: Partial<TextFieldState>) => dispatch(
        createChangeFormElementState(textFieldState, textFieldStateChanges),
    ),
});

export const TextField = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DumbInputField);
