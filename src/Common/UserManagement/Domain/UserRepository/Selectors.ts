import {User, UserRepositoryState} from "Common/UserManagement/Domain/UserRepository/Types";

export function findUserById(state: UserRepositoryState, userId: string): (null | User) {
    const user = state.users.find((user) => (user.id === userId));
    if(!user) {
        return null;
    }
    return user;
}