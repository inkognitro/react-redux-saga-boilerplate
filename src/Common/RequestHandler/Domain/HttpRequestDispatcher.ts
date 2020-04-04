import {HttpRequest, HttpRequestResponse} from "Common/RequestHandler/Domain/Types";

export interface HttpRequestDispatcher {
    executeRequest(request: HttpRequest): Promise<HttpRequestResponse>
}