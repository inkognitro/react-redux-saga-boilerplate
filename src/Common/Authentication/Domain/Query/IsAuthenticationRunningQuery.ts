import {AuthState, AuthStateSelector} from "Common/Authentication/Domain/Types";

function isAuthenticationRunning(state: AuthState): boolean {
    return state.isAuthenticationRunning;
}

export class IsAuthenticationRunningQuery {
    private readonly getAuthState: AuthStateSelector;

    constructor(getAuthState: AuthStateSelector) {
        this.getAuthState = getAuthState;
    }

    public execute(): boolean {
        return isAuthenticationRunning(this.getAuthState());
    }
}