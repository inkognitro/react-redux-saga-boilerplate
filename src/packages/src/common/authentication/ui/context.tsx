import { createContext, useContext } from 'react';
import { AuthState, getCurrentAuthUser, initialAuthState } from 'packages/common/authentication/domain';
import { AuthUser } from 'packages/common/types/auth-user/domain';

const context = createContext<AuthState>(initialAuthState);
export const AuthContextProvider = context.Provider;

export function useAuthState(): AuthState {
    return useContext(context);
}

export function useCurrentUser(): AuthUser {
    const authState = useAuthState();
    return getCurrentAuthUser(authState);
}
