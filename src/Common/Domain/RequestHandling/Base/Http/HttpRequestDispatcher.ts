import {
    HttpRequest,
    HttpRequestResponse,
} from "Common/Domain/RequestHandling/Base/Http/Types";

export interface HttpRequestDispatcher {
  executeRequest(request: HttpRequest): Promise<HttpRequestResponse>;
}
