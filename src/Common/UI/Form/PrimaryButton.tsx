import React, { FC } from "react";

export type PrimaryButtonProps = {
  onClick?(): void;
  isDisabled?: boolean;
};

function createContentClassName(props: PrimaryButtonProps) {
    const classNames = ["btn", "btn-primary"];
    if (props.isDisabled) {
        classNames.push("disabled");
    }
    return classNames.join(" ");
}

export const PrimaryButton: FC<PrimaryButtonProps> = (props) => (
    <button
        type="button"
        className={createContentClassName(props)}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);
