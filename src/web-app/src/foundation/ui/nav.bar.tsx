import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
    getCurrentAuthUser,
    isCurrentUserInitializationRunning,
    createLogout,
} from 'packages/common/authentication/domain';
import { AuthUserTypes } from 'packages/common/types/auth-user/domain';
import { UserLabel } from 'packages/common/types/user/ui/web';
import { TranslatedText } from 'packages/common/translator/ui/web';
import { TranslationIds } from 'packages/common/types/util/domain';
import { useAuthState } from 'packages/common/authentication/ui';
import { FunctionalLink, Link } from 'packages/common/layout-foundation/ui/web';
import { createHomeUrl, createLoginUrl } from 'web-app/app.routing';

const AuthLink: FC = () => {
    const dispatch = useDispatch();
    const authState = useAuthState();
    const currentUser = getCurrentAuthUser(authState);
    const userInitializationRunning = isCurrentUserInitializationRunning(authState);
    if (userInitializationRunning) {
        return (
            <li className="nav-item">
                <FunctionalLink className="nav-link">
                    <TranslatedText translation={{ translationId: TranslationIds.LOADING }} />
                </FunctionalLink>
            </li>
        );
    }
    if (currentUser.type === AuthUserTypes.AUTHENTICATED_USER) {
        return (
            <li className="nav-item">
                <FunctionalLink className="nav-link" onClick={() => dispatch(createLogout())}>
                    <UserLabel user={currentUser.user} /> :: Logout
                </FunctionalLink>
            </li>
        );
    }
    return (
        <li className="nav-item">
            <Link className="nav-link" url={createLoginUrl()}>
                Login
            </Link>
        </li>
    );
};

export const NavBar: FC = () => (
    <ul className="nav justify-content-center">
        <li className="nav-item">
            <Link className="nav-link" url={createHomeUrl()}>
                Home
            </Link>
        </li>
        <AuthLink />
    </ul>
);
