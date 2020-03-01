import React, {Component} from 'react';
import {CommonInputElementProps} from "Common/Layout/UI/Form/InputElements/InputElement";
import uuidV4 from 'uuid/v4';
import {ErrorIcon} from "Common/Layout/UI/Icons/ErrorIcon";
import {IconSizes, IconTypes} from "Common/Layout/UI/Icons/Icon";

export enum TextFieldTypes {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = 'password',
}

export type TextFieldProps = (CommonInputElementProps & {
    isDisabled?: boolean
    onChange?(value: string): void,
    placeholder?: string,
    type?: TextFieldTypes,
    value?: string,
    errorMessage?: (Component | string),
});

export class TextField extends Component<TextFieldProps> {
    private readonly id: string;

    constructor(props: TextFieldProps) {
        super(props);
        this.id = uuidV4();
    }

    renderLabel() {
        if (!this.props.label) {
            return null;
        }
        return (
            <label htmlFor={this.id}>
                {this.props.label}
            </label>
        );
    }

    createInputProps() {
        const type = (this.props.type ? this.props.type : TextFieldTypes.TEXT);
        let inputProps = {
            id: this.id,
            placeholder: this.props.placeholder,
            className: 'form-control',
            type: type,
        };
        if (this.props.onChange) {
            inputProps = Object.assign({}, inputProps, {
                //@ts-ignore
                onChange: (event) => this.props.onChange(event.target.value)
            });
        }
        if (this.props.value) {
            inputProps = Object.assign({}, inputProps, {
                value: this.props.value
            });
        }
        return inputProps;
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
            <div className="form-group">
                {this.renderLabel()}
                <input {...this.createInputProps()} />
                {this.renderErrorMessage()}
            </div>
        );
    }
}