import {ExecutionSummary, Request} from "Common/RequestHandling/Domain/Types";
import {
    GetRequestCreationSettings,
    PostRequestCreationSettings
} from "Common/RequestHandling/Domain/HttpRequestFactory";

export interface HttpRequestHandler {
    createGetRequest(settings: GetRequestCreationSettings): Request,
    createPostRequest(settings: PostRequestCreationSettings): Request,
    createPutRequest(settings: PostRequestCreationSettings): Request,
    createPatchRequest(settings: PostRequestCreationSettings): Request,
    createDeleteRequest(settings: PostRequestCreationSettings): Request,
    executeRequest(settings: RequestExecutionSettings): void,
}

export type RequestExecutionSettings = {
    request: Request,
    onSuccess?(summary: ExecutionSummary): void,
    onError?(summary: ExecutionSummary): void,
};