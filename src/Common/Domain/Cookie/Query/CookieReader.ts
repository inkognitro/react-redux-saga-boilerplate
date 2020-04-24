export interface CookieReader {
  findCookieContent(cookieName: string): null | string;
}
