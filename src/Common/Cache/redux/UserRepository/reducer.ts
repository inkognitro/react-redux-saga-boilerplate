import {UserRepositoryState, UserRepositoryActions, UserRepositoryActionTypes} from "./types";

const initialUserRepositoryState: UserRepositoryState = {
    users: [],
};

export function userRepository (state: UserRepositoryState = initialUserRepositoryState, action?: UserRepositoryActions): UserRepositoryState {
    if(action === undefined) {
        return state;
    }

    if(action.type === UserRepositoryActionTypes.RECEIVE_USER) {
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