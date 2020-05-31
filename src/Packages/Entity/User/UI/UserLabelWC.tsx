import React, { FC, Fragment } from "react";
import { User } from "../Domain/User";

export type UserLabelWCProps = {
    user: User;
};

export const UserLabelWC: FC<UserLabelWCProps> = (props) => (<Fragment>{props.user.username}</Fragment>);
