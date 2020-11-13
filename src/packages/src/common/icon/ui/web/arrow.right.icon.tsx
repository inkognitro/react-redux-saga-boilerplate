import React, { FunctionComponent } from 'react';
import { KeyboardArrowRight } from '@material-ui/icons';
import { CommonIconProps, createBaseIconProps, createStyledIcon } from './icon';

export type ArrowRightIconProps = CommonIconProps;

const StyledArrowRightIcon = createStyledIcon(KeyboardArrowRight);

export const ArrowRightIcon: FunctionComponent<ArrowRightIconProps> = (props) => {
    const baseIconProps = createBaseIconProps(props);
    return <StyledArrowRightIcon {...baseIconProps} />;
};
