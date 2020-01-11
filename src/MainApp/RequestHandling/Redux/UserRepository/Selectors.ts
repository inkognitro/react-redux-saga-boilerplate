import {User, UserRepositoryState} from "MainApp/RequestHandling/Redux/UserRepository/Types";

//todo: use reselect library for performance optimization

export function findUserById(state: UserRepositoryState, userId: string): (null | User) {
    const user = state.users.find((user) => (user.id === userId));
    if(!user) {
        return null;
    }
    return user;
}