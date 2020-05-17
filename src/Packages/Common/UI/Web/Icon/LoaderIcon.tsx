import React, { FunctionComponent } from "react";
import {
    CommonIconProps,
    createBaseIconProps,
    createStyledIcon,
} from "Packages/Common/UI/Web/Icon/Icon";
import MaterialHourGlassEmptyIcon from "@material-ui/icons/HourglassEmpty";

export type LoaderIconProps = CommonIconProps;

const StyledLoaderIcon = createStyledIcon(MaterialHourGlassEmptyIcon);

export const LoaderIcon: FunctionComponent<LoaderIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledLoaderIcon {...baseIconProps} />;
};
