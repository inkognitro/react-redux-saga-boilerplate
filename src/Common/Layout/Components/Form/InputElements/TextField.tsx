import React, {Component} from 'react';
import {CommonInputElementProps} from "Common/Layout/Components/Form/InputElements/InputElement";
import uuidV4 from 'uuid/v4';

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
});

export class TextField extends Component<TextFieldProps> {
    private readonly id: string;

    constructor(props: TextFieldProps) {
        super(props);
        this.id = uuidV4();
    }

    renderLabel() {
        if(!this.props.label) {
            return;
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
        if(this.props.onChange) {
            inputProps = Object.assign({}, inputProps, {
                //@ts-ignore
                onClick: (event) => this.props.onChange(event.target.value)
            });
        }
        if(this.props.value) {
            inputProps = Object.assign({}, inputProps, {
                value: this.props.value
            });
        }
        return inputProps;
    }

    render() {
        return (
            <div className="form-group">
                {this.renderLabel()}
                <input {...this.createInputProps()} />
            </div>
        );
    }
}