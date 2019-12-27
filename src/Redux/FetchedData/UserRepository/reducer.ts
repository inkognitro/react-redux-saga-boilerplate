import {UserRepositoryState, UserRepositoryActionType, RECEIVE_USER} from "App/Redux/FetchedData/UserRepository/types";

const initialUserRepositoryState: UserRepositoryState = {
    users: [],
};

export function userRepository (state: UserRepositoryState = initialUserRepositoryState, action?: UserRepositoryActionType): UserRepositoryState {
    if(action === undefined) {
        return state;
    }

    if(action.type === RECEIVE_USER) {
        return Object.assign({}, state, {
            users: [
                ...state.users.filter((user) => (user.id !== action.payload.user.id)),
                action.payload.user
            ]
        });
    }

    return state;
}