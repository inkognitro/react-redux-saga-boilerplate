import React, { FunctionComponent } from "react";

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

export const SecondaryButton: FunctionComponent<SecondaryButtonProps> = (
  props
) => {
  return (
    <button
      type="button"
      className={createContentClassName(props)}
      onClick={props.onClick}
      {props.children}
    </button>
  );
};
