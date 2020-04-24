import React, { FC } from "react";
import {
  TextFieldState,
  Types,
} from "Common/Domain/Form/Element/TextField/Types";
import { Messages } from "Common/UI/Form/Messages";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createTextFieldStateWasChanged } from "Common/Domain/Form/Element/TextField/Event/TextFieldStateWasChanged";

function createHtmlInputTypeByTextFieldType(type: Types): string {
  if (type === Types.PASSWORD) {
    return "password";
  }
  if (type === Types.EMAIL) {
    return "email";
  }
  return "text";
}

type DumbTextFieldCallbacks = {
  onChange(textFieldId: string, state: TextFieldState): void;
};

type DumbTextFieldProps = DumbTextFieldCallbacks & {
  data: TextFieldState;
};

const DumbTextField: FC<DumbTextFieldProps> = (props) => {
  const onChange = props.data.readOnly
    ? undefined
    : (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(props.data.id, {
          ...props.data,
          value: event.target.value,
        });
      };
  return (
    <>
      <input
        id={props.data.id}
        className="form-control"
        type={createHtmlInputTypeByTextFieldType(props.data.type)}
        value={props.data.value}
        onChange={onChange}
        readOnly={props.data.readOnly}
      />
      <Messages messages={props.data.messages} />
    </>
  );
};

const mapStateToProps = (
  rootState: object,
  props: { stateSelector: (rootState: object) => TextFieldState }
): { data: TextFieldState } => {
  return {
    data: props.stateSelector(rootState),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DumbTextFieldCallbacks => {
  return {
    onChange: (textFieldId: string, textFieldState: TextFieldState) =>
      dispatch(createTextFieldStateWasChanged(textFieldId, textFieldState)),
  };
};

export const TextField = connect(
  mapStateToProps,
  mapDispatchToProps
)(DumbTextField);
