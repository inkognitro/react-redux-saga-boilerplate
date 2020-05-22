import React, { FC, Fragment } from "react";
import { User } from "Packages/Entity/User/Domain/User";

export type UserLabelProps = {
    user: User;
};

export const UserLabel: FC<UserLabelProps> = (props) => (<Fragment>{props.user.username}</Fragment>);
