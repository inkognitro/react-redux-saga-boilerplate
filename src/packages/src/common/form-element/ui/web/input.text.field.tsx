import React, { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import {
    FormElementTypes,
    TextFieldState,
    PasswordFieldState,
    EmailFieldState,
    createFormElementStateWasChanged,
} from '../../domain';
import { Messages } from './messages';

type InputFieldState = TextFieldState | PasswordFieldState | EmailFieldState;

function createHtmlInputTypeByTextFieldType(type: FormElementTypes): string {
    if (type === FormElementTypes.TEXT) {
        return 'text';
    }
    if (type === FormElementTypes.PASSWORD) {
        return 'password';
    }
    if (type === FormElementTypes.EMAIL) {
        return 'email';
    }
    throw new Error(`Form element type "${type}" not supported!`);
}

type InputFieldProps<D extends InputFieldState> = {
    data: D;
    label?: ReactNode;
};

type InternalInputFieldProps<D extends InputFieldState = any> = InputFieldProps<D> & {
    onChange: (stateChanges: Partial<D>) => void;
    data: D;
};

const InternalInputField: FC<InternalInputFieldProps> = (props) => {
    const onChange = props.data.isDisabled
        ? undefined
        : (event: React.ChangeEvent<HTMLInputElement>) => props.onChange({ value: event.target.value });
    return (
        <>
            {props.label}
            <input
                id={props.data.id}
                className="form-control"
                type={createHtmlInputTypeByTextFieldType(props.data.type)}
                value={props.data.value}
                onChange={onChange}
                disabled={props.data.readOnly}
            />
            {props.data.messages.length === 0 ? null : <Messages messages={props.data.messages} />}
        </>
    );
};

export type TextFieldProps = InputFieldProps<TextFieldState>;
export const TextField: FC<TextFieldProps> = (props) => {
    const dispatch = useDispatch();
    return (
        <InternalInputField
            {...props}
            onChange={(stateChanges) => dispatch(createFormElementStateWasChanged(props.data, stateChanges))}
        />
    );
};

export type PasswordFieldProps = InputFieldProps<PasswordFieldState>;
export const PasswordField: FC<PasswordFieldProps> = (props) => {
    const dispatch = useDispatch();
    return (
        <InternalInputField
            {...props}
            onChange={(stateChanges) => dispatch(createFormElementStateWasChanged(props.data, stateChanges))}
        />
    );
};

export type EmailFieldProps = InputFieldProps<EmailFieldState>;
export const EmailField: FC<EmailFieldProps> = (props) => {
    const dispatch = useDispatch();
    return (
        <InternalInputField
            {...props}
            onChange={(stateChanges) => dispatch(createFormElementStateWasChanged(props.data, stateChanges))}
        />
    );
};
