import { HttpFoundationState, Request } from './types';

export function findRunningHttpRequestById(state: HttpFoundationState, requestId: string): null | Request {
    const request = state.runningRequests.find((request) => request.id === requestId);
    return !request ? null : request;
}
