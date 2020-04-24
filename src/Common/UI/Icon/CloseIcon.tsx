import React, { FunctionComponent } from "react";
import {
  CommonIconProps,
  createBaseIconProps,
  createStyledIcon,
} from "Common/UI/Icon/Icon";
import MaterialCloseIcon from "@material-ui/icons/Close";

export type CloseIconProps = CommonIconProps;

const StyledCloseIcon = createStyledIcon(MaterialCloseIcon);

export const CloseIcon: FunctionComponent<CloseIconProps> = (props) => {
  const baseIconProps = createBaseIconProps(props);
  return <StyledCloseIcon {...baseIconProps} />;
};
