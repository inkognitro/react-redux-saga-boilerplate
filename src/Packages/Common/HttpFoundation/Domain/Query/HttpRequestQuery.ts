import {
    Request,
    HttpFoundationState,
} from "Packages/Common/HttpFoundation/Domain/Types";

export function findRunningHttpRequestById(
    state: HttpFoundationState,
    requestId: string,
): null | Request {
    for (const index in state.runningHttpRequests) {
        const request = state.runningHttpRequests[index];
        if (request.id === requestId) {
            return request;
        }
    }
    return null;
}
