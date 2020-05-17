import React, { FunctionComponent } from "react";
import {
    CommonIconProps,
    createBaseIconProps,
    createStyledIcon,
} from "Packages/Common/UI/Web/Icon/Icon";
import DoneIcon from "@material-ui/icons/Done";

export type SuccessIconProps = CommonIconProps;

const StyledDoneIcon = createStyledIcon(DoneIcon);

export const SuccessIcon: FunctionComponent<SuccessIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledDoneIcon {...baseIconProps} />;
};
