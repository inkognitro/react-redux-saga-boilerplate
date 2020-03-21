export type AuthState = {
    isFetchingApiToken: boolean,
    apiToken: (string | null),
    currentUserId: (string | null),
}

export type AuthStateSelector = () => AuthState;