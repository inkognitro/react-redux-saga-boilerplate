import {
    HttpEventTypes,
    Request,
    Response,
} from "Packages/Common/HttpFoundation/Domain/Types";
import {Event} from "Packages/Common/CommonTypes";

export function createHttpErrorResponseWasReceived(
    request: Request,
    response: Response,
): HttpErrorResponseWasReceived {
    return {
        type: HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
        payload: { request, response },
    };
}

export type HttpErrorResponseWasReceived<ResponseBody = any> = Event<
  HttpEventTypes.HTTP_ERROR_RESPONSE_WAS_RECEIVED,
  {
    request: Request;
    response: Response<ResponseBody>;
  }
>;
