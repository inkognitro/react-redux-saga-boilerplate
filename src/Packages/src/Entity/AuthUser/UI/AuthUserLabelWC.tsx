import React, { FC, Fragment } from "react";
import { UserLabelWC } from "Packages/Entity/User";
import { AuthUser, AuthUserTypes } from "../Domain/Types";

export type AuthUserLabelWCProps = {
    authUser: AuthUser;
};

export const AuthUserLabelWC: FC<AuthUserLabelWCProps> = (props) => {
    if (props.authUser.type === AuthUserTypes.ANONYMOUS) {
        return (<Fragment>Guest</Fragment>);
    }
    if (props.authUser.type === AuthUserTypes.AUTHENTICATED_USER) {
        return (<UserLabelWC user={props.authUser.user} />);
    }
    // @ts-ignore
    throw new Error(`Not supported authUser "${props.authUser.type}" is not supported`);
};
