import { Event } from "Packages/Entity/CommonTypes";
import {
    HttpEventTypes,
    Request,
    Response,
} from "../Types";

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
