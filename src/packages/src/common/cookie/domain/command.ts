import { Command } from "packages/entity/common-types";
import { Cookie } from "./types";

export enum CookieCommandTypes {
    SAVE_COOKIE = "SAVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468",
    REMOVE_COOKIE = "REMOVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468",
}

export function createSaveCookie(cookie: Cookie): SaveCookie {
    return {
        type: CookieCommandTypes.SAVE_COOKIE,
        payload: {
            cookie,
        },
    };
}

export type SaveCookie = Command<CookieCommandTypes.SAVE_COOKIE,
    {
        cookie: Cookie;
    }>;

export function createRemoveCookie(name: string): RemoveCookie {
    return {
        type: CookieCommandTypes.REMOVE_COOKIE,
        payload: {
            cookieName: name,
        },
    };
}

export type RemoveCookie = Command<CookieCommandTypes.REMOVE_COOKIE, {
    cookieName: string;
}>;
