import React, { FC } from "react";

export type PrimaryButtonWCProps = {
  onClick?(): void;
  isDisabled?: boolean;
};

function createContentClassName(props: PrimaryButtonWCProps): string {
    const classNames = ["btn", "btn-primary"];
    if (props.isDisabled) {
        classNames.push("disabled");
    }
    return classNames.join(" ");
}

export const PrimaryButtonWC: FC<PrimaryButtonWCProps> = (props) => (
    <button
        type="button"
        className={createContentClassName(props)}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);
