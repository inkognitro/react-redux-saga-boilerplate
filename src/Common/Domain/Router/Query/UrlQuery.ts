import { RouterState } from "Common/Domain/Router/Types";
import { isUrlMatchingRoute } from "Common/Domain/Router/Query/UrlMatchesRouteQuery";

export function getByRedirectInfluencedUrl(
  state: RouterState,
  url: string
): string {
  const alreadyFoundRedirectUrls: string[] = [];
  const urlToGo = url;
  let foundRedirectUrl = findRedirectUrlForUrl(state, urlToGo);
  while (foundRedirectUrl !== null) {
    foundRedirectUrl = findRedirectUrlForUrl(state, urlToGo);
    if (foundRedirectUrl === null) {
      continue;
    }
    if (alreadyFoundRedirectUrls.includes(foundRedirectUrl)) {
      console.error(
        `Infinite redirect loop with url "${urlToGo}"!` +
          ` Returned base url "${url}" instead.`
      );
      return url;
    }
    alreadyFoundRedirectUrls.push(foundRedirectUrl);
  }
  return urlToGo;
}

function findRedirectUrlForUrl(state: RouterState, url: string): null | string {
  for (const index in state.redirects) {
    const redirect = state.redirects[index];
    if (isUrlMatchingRoute(url, redirect.fromRoute)) {
      return redirect.toUrl;
    }
  }
  return null;
}
