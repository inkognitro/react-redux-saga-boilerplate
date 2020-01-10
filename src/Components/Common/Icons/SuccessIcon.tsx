import React, { FunctionComponent } from 'react';
import {CommonIconProps, createBaseIconProps} from "App/Components/Common/Icons/types";
import DoneIcon from '@material-ui/icons/Done';

export type SuccessIconProps = CommonIconProps;

export const SuccessIcon: FunctionComponent<SuccessIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return (<DoneIcon {...baseIconProps} />);
};
