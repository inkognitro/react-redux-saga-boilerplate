import { AuthenticatedAuthUser } from "packages/common/types/auth-user/domain";
import { CurrentUserStorage } from "../domain";

const currentUserStorageKey = 'currentUser157c737a';

export class BrowserCurrentUserStorage implements CurrentUserStorage {
    public save(user: AuthenticatedAuthUser): void {
        window.sessionStorage.setItem(currentUserStorageKey, JSON.stringify(user));
        if (user.shouldRemember) {
            window.localStorage.setItem(currentUserStorageKey, JSON.stringify(user));
        }
    }

    public find(): (null | AuthenticatedAuthUser) {
        let userAsString = window.localStorage.getItem(currentUserStorageKey);
        if (!userAsString) {
            userAsString = window.sessionStorage.getItem(currentUserStorageKey);
        }
        if (!userAsString) {
            return null;
        }
        return JSON.parse(userAsString);
    }

    public remove(): void {
        window.sessionStorage.removeItem(currentUserStorageKey);
        window.localStorage.removeItem(currentUserStorageKey);
    }
}
