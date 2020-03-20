import {UserRepositoryState, UserRepositoryEventTypes, UserRepositoryEvent} from "Common/EntityCache/Domain/User/Types";

const initialUserRepositoryState: UserRepositoryState = {
    users: [],
};

export function userRepository (state: UserRepositoryState = initialUserRepositoryState, event?: UserRepositoryEvent): UserRepositoryState {
    if(event === undefined) {
        return state;
    }

    if(event.type === UserRepositoryEventTypes.USER_WAS_UPDATED) {
        const storedUserIndex = state.users.findIndex((user) => (user.id === event.payload.user.id));
        if(storedUserIndex === -1) {
            return Object.assign({}, state, {
                users: [
                    ...state.users,
                    event.payload.user,
                ]
            });
        }
        return Object.assign({}, state, {
            users: [
                ...state.users.slice(0, storedUserIndex),
                Object.assign({}, state.users[storedUserIndex], event.payload.user),
                ...state.users.slice(storedUserIndex + 1),
            ]
        });
    }

    return state;
}