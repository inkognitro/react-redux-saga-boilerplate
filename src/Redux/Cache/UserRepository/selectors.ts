import {User} from "App/Redux/Cache/UserRepository/types";
import {RootState} from "App/Redux/root";

//todo: use reselect library for performance optimization

export function findUserById(state: RootState, userId: string): (null | User) {
    const user = state.cache.userRepository.users.find((user) => (user.id === userId));
    if(!user) {
        return null;
    }
    return user;
}