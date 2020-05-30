import {
    CookieStorage as CookieStorageType,
    CookieReader as CookieReaderType,
    Cookie as CookieType,
    CookieEvent as CookieEventType,
} from './Domain/Types'
import { SaveCookie as SaveCookieType } from './Domain/Command/SaveCookie';
import { RemoveCookie as RemoveCookieType } from './Domain/Command/RemoveCookie';
import { CookieWasRemoved as CookieWasRemovedType } from './Domain/Event/CookieWasRemoved';
import { CookieWasSaved as CookieWasSavedType } from './Domain/Event/CookieWasSaved';

export type CookieStorage = CookieStorageType;
export type CookieReader = CookieReaderType;
export type Cookie = CookieType;
export type CookieEvent = CookieEventType;
export type SaveCookie = SaveCookieType;
export type RemoveCookie = RemoveCookieType;
export type CookieWasRemoved = CookieWasRemovedType;
export type CookieWasSaved = CookieWasSavedType;

export { BrowserCookieStorage } from './Infrastructure/BrowserCookieStorage';
export { CookieEventTypes, CookieCommandTypes } from './Domain/Types';
export { createCookieSaga } from './Domain/Saga/Flow';
export { createSaveCookie } from './Domain/Command/SaveCookie';
export { createRemoveCookie } from './Domain/Command/RemoveCookie';
