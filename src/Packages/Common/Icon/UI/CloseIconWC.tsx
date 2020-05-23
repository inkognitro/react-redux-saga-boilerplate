import React, { FunctionComponent } from "react";
import MaterialCloseIcon from "@material-ui/icons/Close";
import {
    CommonIconWCProps,
    createBaseIconProps,
    createStyledIcon,
} from "./IconWC";

export type CloseIconProps = CommonIconWCProps;

const StyledCloseIcon = createStyledIcon(MaterialCloseIcon);

export const CloseIconWC: FunctionComponent<CloseIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledCloseIcon {...baseIconProps} />;
};
