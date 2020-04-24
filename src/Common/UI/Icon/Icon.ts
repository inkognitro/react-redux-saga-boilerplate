import { StyledComponentProps } from "Common/UI/Design/Types";
import styled, { StyledComponent } from "styled-components";
import { ComponentType } from "react";

export enum IconTypes {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INTERACTIVE = "interactive",
  SECONDARY = "secondary",
  WHITE = "white",
}

export enum IconSizes {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export enum VerticalAligns {
  TOP = "top",
  CENTER = "center",
  BOTTOM = "bottom",
}

export type CommonIconProps = {
  verticalAlign?: VerticalAligns;
  type?: IconTypes;
  size?: IconSizes;
  className?: string;
  onClick?(): void;
};

export function createStyledIcon(
  component: ComponentType
): StyledComponent<ComponentType, any> {
  return styled(component)`
    color: ${(props: StyledComponentProps) => props.theme.colorText};
    font-size: 24px !important;

    &.style-info {
      color: ${(props: StyledComponentProps) => props.theme.colorInfo};
    }
    &.style-success {
      color: ${(props: StyledComponentProps) => props.theme.colorSuccess};
    }
    &.style-warning {
      color: ${(props: StyledComponentProps) => props.theme.colorWarning};
    }
    &.style-error {
      color: ${(props: StyledComponentProps) => props.theme.colorError};
    }
    &.style-interactive {
      color: ${(props: StyledComponentProps) => props.theme.colorInteractive};
    }
    &.style-secondary {
      color: ${(props: StyledComponentProps) => props.theme.colorSecondary};
    }
    &.style-white {
      color: white;
    }

    &.size-xs {
      font-size: 18px !important;
    }
    &.size-sm {
      font-size: 20px !important;
    }
    &.size-md {
      font-size: 24px !important;
    }
    &.size-lg {
      font-size: 30px !important;
    }
    &.size-xl {
      font-size: 40px !important;
    }

    &.vertical-align-top {
      vertical-align: top;
    }
    &.vertical-align-center {
      vertical-align: center;
    }
    &.vertical-align-bottom {
      vertical-align: bottom;
    }

    &.clickable {
      cursor: pointer;
      &:hover,
      &:active,
      &:focus {
        color: ${(props: StyledComponentProps) => props.theme.colorInteractive};
        text-decoration: underline;
      }
    }
  `;
}

type IconProps = {
  className?: string;
  onClick?(): void;
};

export function createBaseIconProps(commonProps: CommonIconProps): IconProps {
  let props = {
    className: createBaseClassNames(commonProps),
  };
  if (commonProps.onClick) {
    props = { ...props, onClick: commonProps.onClick };
  }
  return props;
}

function createBaseClassNames(props: CommonIconProps): string {
  const classNames = [];

  if (props.type === IconTypes.INFO) {
    classNames.push("style-info");
  } else if (props.type === IconTypes.SUCCESS) {
    classNames.push("style-success");
  } else if (props.type === IconTypes.WARNING) {
    classNames.push("style-warning");
  } else if (props.type === IconTypes.ERROR) {
    classNames.push("style-error");
  } else if (props.type === IconTypes.INTERACTIVE) {
    classNames.push("style-interactive");
  } else if (props.type === IconTypes.SECONDARY) {
    classNames.push("style-secondary");
  } else if (props.type === IconTypes.WHITE) {
    classNames.push("style-white");
  }

  if (props.size === IconSizes.XS) {
    classNames.push("size-xs");
  } else if (props.size === IconSizes.SM) {
    classNames.push("size-sm");
  } else if (props.size === IconSizes.MD) {
    classNames.push("size-md");
  } else if (props.size === IconSizes.LG) {
    classNames.push("size-lg");
  } else if (props.size === IconSizes.XL) {
    classNames.push("size-xl");
  }

  if (props.verticalAlign === VerticalAligns.TOP) {
    classNames.push("vertical-align-top");
  } else if (props.verticalAlign === VerticalAligns.BOTTOM) {
    classNames.push("vertical-align-bottom");
  } else {
    classNames.push("vertical-align-center");
  }

  if (props.onClick) {
    classNames.push("clickable");
  }

  if (props.className) {
    classNames.push(props.className);
  }

  return classNames.join(" ");
}
