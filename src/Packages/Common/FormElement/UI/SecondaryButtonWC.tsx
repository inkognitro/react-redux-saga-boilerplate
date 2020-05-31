import React, { FC } from "react";

export type SecondaryButtonWCProps = {
  onClick?(): void;
  isDisabled?: boolean;
};

function createContentClassName(props: SecondaryButtonWCProps): string {
    const classNames = ["btn", "btn-secondary"];
    if (props.isDisabled) {
        classNames.push("disabled");
    }
    return classNames.join(" ");
}

export const SecondaryButtonWC: FC<SecondaryButtonWCProps> = (props) => (
    <button
        type="button"
        className={createContentClassName(props)}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);
