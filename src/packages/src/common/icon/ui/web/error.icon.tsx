import React, { FunctionComponent } from 'react';
import MaterialErrorIcon from '@material-ui/icons/Error';
import { CommonIconProps, createBaseIconProps, createStyledIcon } from './icon';

export type ErrorIconProps = CommonIconProps;

const StyledMaterialErrorIcon = createStyledIcon(MaterialErrorIcon);

export const ErrorIcon: FunctionComponent<ErrorIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledMaterialErrorIcon {...baseIconProps} />;
};
