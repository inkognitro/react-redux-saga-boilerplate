import React, { FunctionComponent } from "react";
import {
    CommonIconProps,
    createBaseIconProps,
    createStyledIcon,
} from "Common/UI/Icon/Icon";
import MaterialErrorIcon from "@material-ui/icons/Error";

export type ErrorIconProps = CommonIconProps;

const StyledMaterialErrorIcon = createStyledIcon(MaterialErrorIcon);

export const ErrorIcon: FunctionComponent<ErrorIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledMaterialErrorIcon {...baseIconProps} />;
};
