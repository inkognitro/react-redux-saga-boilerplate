import React, { FunctionComponent } from 'react';
import {CommonIconProps, createBaseIconProps} from "Common/UI/Base/Icon/Icon";
import MaterialErrorIcon from '@material-ui/icons/Error';
export type ErrorIconProps = CommonIconProps;

export const ErrorIcon: FunctionComponent<ErrorIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return (<MaterialErrorIcon {...baseIconProps} />);
};
