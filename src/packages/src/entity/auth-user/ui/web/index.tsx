import React, { FC } from "react";
import { UserLabel } from "packages/entity/user/ui/web";
import { AuthUser, AuthUserTypes } from "../../domain";

export type AuthUserLabelWCProps = {
    authUser: AuthUser;
};

export const AuthUserLabelWC: FC<AuthUserLabelWCProps> = (props) => {
    if (props.authUser.type === AuthUserTypes.ANONYMOUS) {
        return (<>Guest</>);
    }
    if (props.authUser.type === AuthUserTypes.AUTHENTICATED_USER) {
        return (<UserLabel user={props.authUser.user} />);
    }
    // @ts-ignore
    throw new Error(`Not supported authUser "${props.authUser.type}" is not supported`);
};
