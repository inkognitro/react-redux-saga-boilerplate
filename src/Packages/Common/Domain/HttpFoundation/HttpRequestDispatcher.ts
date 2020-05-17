import {
    Request,
    RequestResponse,
} from "Packages/Common/Domain/HttpFoundation/Types";

export interface HttpRequestDispatcher {
  executeRequest(request: Request): Promise<RequestResponse>;
}
