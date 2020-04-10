import React, { FunctionComponent } from 'react';
import {CommonIconProps, createBaseIconProps} from "Common/UI/Base/Icon/Icon";
import MaterialCloseIcon from '@material-ui/icons/Close';
export type CloseIconProps = CommonIconProps;

export const CloseIcon: FunctionComponent<CloseIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return (<MaterialCloseIcon {...baseIconProps} />);
};
