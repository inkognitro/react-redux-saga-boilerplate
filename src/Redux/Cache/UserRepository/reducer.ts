import {UserRepositoryState, UserRepositoryActionType, RECEIVE_USER} from "./types";

const initialUserRepositoryState: UserRepositoryState = {
    users: [
        {
            id: '8e5ae1bc-7f5f-49b8-8aff-2c6a5955c612',
            username: 'vegeta',
            apiToken: 'some-pseudo-api-token-1234'
        },
    ], //todo: replace with empty array!
};

export function userRepository (state: UserRepositoryState = initialUserRepositoryState, action?: UserRepositoryActionType): UserRepositoryState {
    if(action === undefined) {
        return state;
    }

    if(action.type === RECEIVE_USER) {
        const storedUserIndex = state.users.findIndex((user) => (user.id === action.payload.user.id));
        if(storedUserIndex === -1) {
            return Object.assign({}, state, {
                users: [
                    ...state.users,
                    action.payload.user,
                ]
            });
        }
        return Object.assign({}, state, {
            users: [
                ...state.users.slice(0, storedUserIndex),
                Object.assign({}, state.users[storedUserIndex], action.payload.user),
                ...state.users.slice(storedUserIndex + 1),
            ]
        });
    }

    return state;
}