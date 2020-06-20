import { Event } from "Packages/Entity/CommonTypes";
import { Request, Response } from "../Types";
import { HttpEventTypes } from "./Types";

export function createHttpSuccessResponseWasReceived(
    request: Request,
    response: Response,
): HttpSuccessResponseWasReceived {
    return {
        type: HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
        payload: { request, response },
    };
}

export type HttpSuccessResponseWasReceived<ResponseBody = any> = Event<
  HttpEventTypes.HTTP_SUCCESS_RESPONSE_WAS_RECEIVED,
  {
    request: Request;
    response: Response<ResponseBody>;
  }
>;
