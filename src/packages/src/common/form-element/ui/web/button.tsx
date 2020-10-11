import React, { FC } from "react";

export type ButtonProps = {
    onClick?(): void
    isDisabled?: boolean
};

function createButtonClassName(props: InternalButtonProps): string {
    const classNames = ['btn'];
    if (props.isDisabled) {
        classNames.push('disabled');
    }
    if (props.extraClassName) {
        classNames.push(props.extraClassName);
    }
    return classNames.join(' ');
}

type InternalButtonProps = ButtonProps & { extraClassName: string }
const InternalButton: FC<InternalButtonProps> = (props) => (
    <button
        type="button"
        className={createButtonClassName(props)}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);

export const PrimaryButton: FC<ButtonProps> = (props) => (<InternalButton {...props} extraClassName="btn-primary" />);
export const SecondaryButton: FC<ButtonProps> = (props) => (<InternalButton {...props} extraClassName="btn-secondary" />);
