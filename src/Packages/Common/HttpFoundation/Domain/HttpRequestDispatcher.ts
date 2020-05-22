import {
    Request,
    RequestResponse,
} from "Packages/Common/HttpFoundation/Domain/Types";

export interface HttpRequestDispatcher {
  executeRequest(request: Request): Promise<RequestResponse>;
}
