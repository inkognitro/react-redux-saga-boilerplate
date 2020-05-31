import { CookieWasRemoved, CookieWasSaved } from "Packages/Common/Cookie";

export type Cookie = {
  name: string;
  content: string;
  timeToLiveInDays?: number;
};

export enum CookieEventTypes {
  COOKIE_WAS_SAVED = "COOKIE_WAS_SAVED-9266728a-7572-48cb-9ff4-2e27071e1343",
  COOKIE_WAS_REMOVED = "COOKIE_WAS_REMOVED-9266728a-7572-48cb-9ff4-2e27071e1343",
}

export type CookieEvent = CookieWasSaved | CookieWasRemoved;

export enum CookieCommandTypes {
  SAVE_COOKIE = "SAVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468",
  REMOVE_COOKIE = "REMOVE_COOKIE-d12895c4-7a9c-423d-b01d-c4be1d770468",
}

export interface CookieReader {
  findCookieContent(cookieName: string): null | string;
}

export interface CookieStorage extends CookieReader {
  saveCookie(settings: Cookie): void;

  removeCookie(cookieName: string): void;
}
