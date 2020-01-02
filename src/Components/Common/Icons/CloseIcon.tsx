import React, { FunctionComponent } from 'react';
import {CommonIconProps, createBaseClassNames} from "App/Components/Common/Icons/types";
import MaterialCloseIcon from '@material-ui/icons/Close';

export type CloseIconProps = CommonIconProps;

export const CloseIcon: FunctionComponent<CloseIconProps> = (props) => {
    return (<MaterialCloseIcon className={createBaseClassNames(props)} />);
};
