import React, { FunctionComponent } from 'react';
import {CommonIconProps, createBaseClassNames} from "App/Components/Common/Icons/types";
import DoneIcon from '@material-ui/icons/Done';

export type SuccessIconProps = CommonIconProps;

export const SuccessIcon: FunctionComponent<SuccessIconProps> = (props) => {
    return (<DoneIcon className={createBaseClassNames(props)} />);
};
