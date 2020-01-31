import React, { FunctionComponent } from 'react';
import {CommonIconProps, createBaseIconProps} from "Common/Application/Layout/Components/Icons/Icon";
import MaterialHourGlassEmptyIcon from '@material-ui/icons/HourglassEmpty';
export type LoaderIconProps = CommonIconProps;

export const LoaderIcon: FunctionComponent<LoaderIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return (<MaterialHourGlassEmptyIcon {...baseIconProps} />);
};
