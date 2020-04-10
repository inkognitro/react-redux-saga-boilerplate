import React, {Component} from 'react';
import {ErrorIcon} from "Common/UI/Base/Icon/ErrorIcon";
import {IconSizes, IconTypes} from "Common/UI/Base/Icon/Icon";

export enum TextFieldTypes {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = 'password',
}

export type TextFieldProps = {
    id?: string,
    isDisabled?: boolean
    onChange?(value: string): void,
    placeholder?: string,
    type: TextFieldTypes,
    value: string,
    errorMessage?: (Component | string),
};

export class TextField extends Component<TextFieldProps> {
    createInputProps() {
        let inputProps = {
            id: this.props.id,
            placeholder: this.props.placeholder,
            className: 'form-control',
            type: this.props.type,
        };
        if (this.props.onChange) {
            inputProps = {
                ...inputProps,
                //@ts-ignore
                onChange: (event) => this.props.onChange(event.target.value)
            };
        }
        return {
            ...inputProps,
            value: this.props.value
        };
    }

    renderErrorMessage() {
        if(!this.props.errorMessage) {
            return null;
        }
        return (
            <small className="text-danger">
                <ErrorIcon size={IconSizes.XS} type={IconTypes.ERROR} /> {this.props.errorMessage}
            </small>
        );
    }

    render() {
        return (
            <React.Fragment>
                <input {...this.createInputProps()} />
                {this.renderErrorMessage()}
            </React.Fragment>
        );
    }
}