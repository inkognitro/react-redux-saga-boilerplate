import React, { FunctionComponent } from "react";
import MaterialErrorIcon from "@material-ui/icons/Error";
import {
    CommonIconWCProps,
    createBaseIconProps,
    createStyledIcon,
} from "./IconWC";

export type ErrorIconProps = CommonIconWCProps;

const StyledMaterialErrorIcon = createStyledIcon(MaterialErrorIcon);

export const ErrorIconWC: FunctionComponent<ErrorIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledMaterialErrorIcon {...baseIconProps} />;
};
