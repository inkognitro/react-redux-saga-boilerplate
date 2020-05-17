import {
    Request,
    RequestResponse,
} from "Common/Domain/HttpFoundation/Types";

export interface HttpRequestDispatcher {
  executeRequest(request: Request): Promise<RequestResponse>;
}
