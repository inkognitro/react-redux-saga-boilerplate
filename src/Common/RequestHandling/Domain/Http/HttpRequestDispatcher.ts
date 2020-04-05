import {HttpRequest, HttpRequestResponse} from "Common/RequestHandling/Domain/Http/Types";

export interface HttpRequestDispatcher {
    executeRequest(request: HttpRequest): Promise<HttpRequestResponse>
}