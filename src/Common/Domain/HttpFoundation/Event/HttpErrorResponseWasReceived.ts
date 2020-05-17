import {
    HttpEventTypes,
    Request,
    Response,
} from "Common/Domain/HttpFoundation/Types";
import { Event } from "Common/Domain/Bus/Event";

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
