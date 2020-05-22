import React, { FunctionComponent } from "react";
import {
    CommonIconWCProps,
    createBaseIconProps,
    createStyledIcon,
} from "Packages/Common/Icon/UI/IconWC";
import MaterialHourGlassEmptyIcon from "@material-ui/icons/HourglassEmpty";

export type LoaderIconWCProps = CommonIconWCProps;

const StyledLoaderIcon = createStyledIcon(MaterialHourGlassEmptyIcon);

export const LoaderIconWC: FunctionComponent<LoaderIconWCProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledLoaderIcon {...baseIconProps} />;
};
