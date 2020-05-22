import React, { FunctionComponent } from "react";
import {
    CommonIconWCProps,
    createBaseIconProps,
    createStyledIcon,
} from "Packages/Common/Icon/UI/IconWC";
import MaterialCloseIcon from "@material-ui/icons/Close";

export type CloseIconProps = CommonIconWCProps;

const StyledCloseIcon = createStyledIcon(MaterialCloseIcon);

export const CloseIconWC: FunctionComponent<CloseIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledCloseIcon {...baseIconProps} />;
};
