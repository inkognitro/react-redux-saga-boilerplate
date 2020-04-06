import {HttpRequest, HttpRequestResponse} from "Common/RequestHandling/Domain/Base/Http/Types";

export interface HttpRequestDispatcher {
    executeRequest(request: HttpRequest): Promise<HttpRequestResponse>
}