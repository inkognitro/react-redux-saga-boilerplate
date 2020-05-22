import React, { FunctionComponent } from "react";
import {
    CommonIconWCProps,
    createBaseIconProps,
    createStyledIcon,
} from "Packages/Common/Icon/UI/IconWC";
import MaterialErrorIcon from "@material-ui/icons/Error";

export type ErrorIconProps = CommonIconWCProps;

const StyledMaterialErrorIcon = createStyledIcon(MaterialErrorIcon);

export const ErrorIconWC: FunctionComponent<ErrorIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledMaterialErrorIcon {...baseIconProps} />;
};
