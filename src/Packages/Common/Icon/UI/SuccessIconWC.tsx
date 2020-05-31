import React, { FC } from "react";
import DoneIcon from "@material-ui/icons/Done";
import {
    CommonIconWCProps,
    createBaseIconProps,
    createStyledIcon,
} from "./IconWC";

export type SuccessIconWCProps = CommonIconWCProps;

const StyledDoneIcon = createStyledIcon(DoneIcon);

export const SuccessIconWC: FC<SuccessIconWCProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledDoneIcon {...baseIconProps} />;
};
