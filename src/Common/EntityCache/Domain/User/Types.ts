import {UserWasUpdated} from "Common/EntityCache/Domain/User/Event/UserWasUpdated";

type OptionalUserData = Partial<{

}>;

export type User = ({
    id: string,
    username: string,
} & OptionalUserData);

export type UserRepositoryState = {
    users: User[],
};

export enum UserRepositoryEventTypes {
    USER_WAS_UPDATED = 'USER_WAS_RECEIVED-d4c12694-0d28-4fe2-a4d3-0aa5cb365fb5',
}

export type UserRepositoryEvent = (
    UserWasUpdated
);