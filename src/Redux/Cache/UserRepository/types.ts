const ACTION_SUFFIX = 'd4c12694-0d28-4fe2-a4d3-0aa5cb365fb5';

export interface UserRepositoryState {
    users: Array<User>,
}

export type User = {
    id: string,
    username: string,
};

export const RECEIVE_USER = 'RECEIVE_USER' + ACTION_SUFFIX;
interface ReceiverUserAction {
    type: typeof RECEIVE_USER,
    payload: {
        user: User,
    }
}

export type UserRepositoryActionType = (ReceiverUserAction);