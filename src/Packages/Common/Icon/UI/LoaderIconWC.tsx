import React, { FunctionComponent } from "react";
import MaterialHourGlassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import {
    CommonIconWCProps,
    createBaseIconProps,
    createStyledIcon,
} from "./IconWC";

export type LoaderIconWCProps = CommonIconWCProps;

const StyledLoaderIcon = createStyledIcon(MaterialHourGlassEmptyIcon);

export const LoaderIconWC: FunctionComponent<LoaderIconWCProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledLoaderIcon {...baseIconProps} />;
};
