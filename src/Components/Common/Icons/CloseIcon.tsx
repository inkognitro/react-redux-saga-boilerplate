import React, { FunctionComponent } from 'react';
import {CommonIconProps, createBaseIconProps} from "App/Components/Common/Icons/types";
import MaterialCloseIcon from '@material-ui/icons/Close';
export type CloseIconProps = CommonIconProps;

export const CloseIcon: FunctionComponent<CloseIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return (<MaterialCloseIcon {...baseIconProps} />);
};
