import React, { FC } from "react";
import DoneIcon from "@material-ui/icons/Done";
import {
    CommonIconProps,
    createBaseIconProps,
    createStyledIcon,
} from "./icon";

export type SuccessIconProps = CommonIconProps;

const StyledDoneIcon = createStyledIcon(DoneIcon);

export const SuccessIcon: FC<SuccessIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledDoneIcon {...baseIconProps} />;
};
