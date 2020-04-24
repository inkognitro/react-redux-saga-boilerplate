import {
  AuthState,
  AuthStateSelector,
} from "Common/Domain/Authentication/Types";
import { HttpRequest } from "Common/Domain/RequestHandling/Base/Http/Types";
import { findCurrentAuthUser } from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import { createWithHeaderEnhancedHttpRequest } from "Common/Domain/RequestHandling/Base/Http/Command/RequestFactory";
import { put, select, takeEvery } from "@redux-saga/core/effects";
import { ApiV1CommandTypes } from "Common/Domain/RequestHandling/ApiV1/Http/ApiV1Http";
import { createSendHttpRequest as createCommonSendHttpRequest } from "Common/Domain/RequestHandling/Base/Http/Command/SendHttpRequest";
import { SendHttpRequest } from "Common/Domain/RequestHandling/ApiV1/Http/Command/SendHttpRequest";

export function createSendHttpRequestFlow(
  authStateSelector: AuthStateSelector
): () => Generator {
  function getWithAuthTokenEnhancedRequest(
    authState: AuthState,
    request: HttpRequest
  ): HttpRequest {
    const authUser = findCurrentAuthUser(authState);
    if (!authUser) {
      return request;
    }
    const headerProperty = "X-API-TOKEN";
    return createWithHeaderEnhancedHttpRequest(
      request,
      headerProperty,
      authUser.token
    );
  }

  return <GeneratorFunction>function* (): Generator {
    yield takeEvery(ApiV1CommandTypes.SEND_HTTP_REQUEST, function* (
      command: SendHttpRequest
    ): Generator {
      // @ts-ignore
      const authState: AuthState = yield select(authStateSelector);
      const request = getWithAuthTokenEnhancedRequest(
        authState,
        command.payload.request
      );
      // @ts-ignore
      return yield put(createCommonSendHttpRequest(request));
    });
  };
}
