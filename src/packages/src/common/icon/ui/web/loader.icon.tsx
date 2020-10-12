import React, { FunctionComponent } from 'react';
import MaterialHourGlassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { CommonIconProps, createBaseIconProps, createStyledIcon } from './icon';

export type LoaderIconProps = CommonIconProps;

const StyledLoaderIcon = createStyledIcon(MaterialHourGlassEmptyIcon);

export const LoaderIcon: FunctionComponent<LoaderIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledLoaderIcon {...baseIconProps} />;
};
