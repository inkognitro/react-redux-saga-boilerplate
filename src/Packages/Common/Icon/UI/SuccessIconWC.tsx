import React, { FC } from "react";
import {
    CommonIconWCProps,
    createBaseIconProps,
    createStyledIcon,
} from "Packages/Common/Icon/UI/IconWC";
import DoneIcon from "@material-ui/icons/Done";

export type SuccessIconWCProps = CommonIconWCProps;

const StyledDoneIcon = createStyledIcon(DoneIcon);

export const SuccessIconWC: FC<SuccessIconWCProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledDoneIcon {...baseIconProps} />;
};
