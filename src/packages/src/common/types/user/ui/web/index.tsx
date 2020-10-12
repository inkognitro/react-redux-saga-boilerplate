import React, { FC, Fragment } from 'react';
import { User } from '../../domain';

export type UserLabelProps = {
    user: User;
};

export const UserLabel: FC<UserLabelProps> = (props) => <Fragment>{props.user.username}</Fragment>;
