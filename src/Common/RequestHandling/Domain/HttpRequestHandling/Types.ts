import {Request} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";

export type RequestHandlingState = {
    runningHttpRequests: Request[],
}

export enum RequestHandlingActionTypes {
    SEND_REQUEST = 'SEND_REQUEST-27fd0173-f640-46ce-8881-516cdf5c41fc',
    CLOSE_REQUEST = 'CLOSE_REQUEST-27fd0173-f640-46ce-8881-516cdf5c41fc',
}

type SendRequest = {
    type: RequestHandlingActionTypes.SEND_REQUEST,
    payload: {
        request: Request,
    }
};

type CloseRequest = {
    type: RequestHandlingActionTypes.CLOSE_REQUEST,
    payload: {
        requestId: string,
    }
};

export type RequestHandlingActions = (SendRequest | CloseRequest);
