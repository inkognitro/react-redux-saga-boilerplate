import React, { FC } from "react";
import { FormElementTypes, InputFieldState as InputFieldData } from "Common/Domain/FormUtils/FormElements/Types";
import { Messages } from "Common/UI/FormUtils/FormElements/Messages";
import {Dispatch} from "redux";
import {createLogin} from "Common/Domain/Authentication/Command/Login";
import {ToastTypes} from "Common/Domain/Toaster/Types";
import {createShowMessage} from "Common/Domain/Toaster/Command/ShowMessage";
import {createLeakReduxState} from "SinglePageApp/Domain/Routing/Home/Command/LeakReduxState";
import {connect} from "react-redux";

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

type SpecificInputFieldData<SpecificData> = (SpecificData & InputFieldData);

type InputFieldState<SpecificData = {}> = {
  data: SpecificInputFieldData<SpecificData>,
};

type InputFieldCallbacks<SpecificData> = {
  onChange(state: SpecificInputFieldData<SpecificData>, stateChanges: Partial<SpecificInputFieldData<SpecificData>>): void;
};

type InternalInputFieldProps<SpecificData> = (
    InputFieldCallbacks<SpecificData>
    & InputFieldState<SpecificData>
);

export type InternalInputFieldFC<State = {}> = FC<InternalInputFieldProps<State>>

export const InternalInputField: InternalInputFieldFC = (props) => {
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

// todo:
/*
const mapStateToProps = (state: RootState, props: {}): InputFieldState => ({
    data:
});

const mapDispatchToProps = (dispatch: Dispatch): DumbHomeCallbackProps => ({
    onClickLogin: () => dispatch(
        createLogin({
            username: "sonGoku",
            password: "1234",
            shouldRemember: false,
        }),
    ),
    onAddToast: (type: ToastTypes, content: string) => dispatch(
        createShowMessage({
            content,
            toastType: type,
        }),
    ),
    onClickLeakReduxState: () => dispatch(createLeakReduxState()),
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(DumbHome);
*/