import React, {FunctionComponent} from 'react';

export type PrimaryButtonProps = {
    onClick?(): void,
    isDisabled?: boolean
};

function createContentClassName(props: PrimaryButtonProps) {
    let classNames = ['btn', 'btn-primary'];
    if (props.isDisabled) {
        classNames.push('disabled');
    }
    return classNames.join(' ');
}

export const PrimaryButton: FunctionComponent<PrimaryButtonProps> = (props) => {
    return (
        <button type="button" className={createContentClassName(props)} onClick={props.onClick}>
            {props.children}
        </button>
    );
};