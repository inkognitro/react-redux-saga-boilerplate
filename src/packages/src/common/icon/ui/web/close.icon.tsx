import React, { FunctionComponent } from 'react';
import MaterialCloseIcon from '@material-ui/icons/Close';
import { CommonIconProps, createBaseIconProps, createStyledIcon } from './icon';

export type CloseIconProps = CommonIconProps;

const StyledCloseIcon = createStyledIcon(MaterialCloseIcon);

export const CloseIcon: FunctionComponent<CloseIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledCloseIcon {...baseIconProps} />;
};
