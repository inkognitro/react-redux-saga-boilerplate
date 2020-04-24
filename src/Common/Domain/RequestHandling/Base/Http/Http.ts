import { spawn } from "@redux-saga/core/effects";
import { HttpStateSelector } from "Common/Domain/RequestHandling/Base/Http/Types";
import { createWatchSendHttpRequestFlow } from "Common/Domain/RequestHandling/Base/Http/Command/SendHttpRequest";
import { HttpRequestDispatcher } from "Common/Domain/RequestHandling/Base/Http/HttpRequestDispatcher";

export function createHttpFlow(
  httpStateSelector: HttpStateSelector,
  httpRequestDispatcher: HttpRequestDispatcher
): () => Generator {
  return function* () {
    yield spawn(
      createWatchSendHttpRequestFlow(httpStateSelector, httpRequestDispatcher)
    );
  };
}
