import React, { FC } from "react";

export type SecondaryButtonProps = {
  onClick?(): void;
  isDisabled?: boolean;
};

function createContentClassName(props: SecondaryButtonProps) {
    const classNames = ["btn", "btn-secondary"];
    if (props.isDisabled) {
        classNames.push("disabled");
    }
    return classNames.join(" ");
}

export const SecondaryButton: FC<SecondaryButtonProps> = (props) => (
    <button
        type="button"
        className={createContentClassName(props)}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);
