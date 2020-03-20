import {User} from "Common/UserManagement/Domain/UserRepository/Types";
import {EventBus} from "Common/AppBase/EventBus";
import {createUserWasUpdated} from "Common/UserManagement/Domain/UserRepository/Event/UserWasUpdated";

export interface UserRepository {
    updateUser(userData: User): void
}

export class UserRepository implements UserRepository {
    private readonly eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    updateUser(user: User): void {
        this.eventBus.handle(createUserWasUpdated(user));
    }
}