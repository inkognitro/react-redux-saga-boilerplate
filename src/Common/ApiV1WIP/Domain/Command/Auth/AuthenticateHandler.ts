import {
    ApiHttpRequestHandler,
    apiV1BaseUrl,
    createPostRequest,
    HttpRequestResponse,
    SuccessHttpRequestResponse
} from "Common/ApiV1WIP/Domain/ApiHttpRequestHandler";
import {Authenticate} from "Common/ApiV1WIP/Domain/Command/Auth/Authenticate";
import {ReadResponseBody} from "Common/ApiV1WIP/Domain/Types";
import {User} from "Common/Model/Domain/User";

type SuccessResponseBody = ReadResponseBody<{
    token: string,
    user: User
}>;

export class AuthenticateHandler {
    private readonly requestHandler: ApiHttpRequestHandler;

    constructor(requestHandler: ApiHttpRequestHandler) {
        this.requestHandler = requestHandler;
    }

    handle(command: Authenticate): void
    {
        const request = createPostRequest({
            url: apiV1BaseUrl + '/auth/authenticate',
            body: {
                username: command.payload.username,
                password: command.payload.password,
            },
            isLoaderEnabled: command.payload.isLoaderEnabled
        });
        this.requestHandler.executeRequest({
            request: request,
            onSuccess(requestResponse: SuccessHttpRequestResponse<SuccessResponseBody>): void {
                if(command.payload.onSuccess) {
                    command.payload.onSuccess({
                        token: requestResponse.response.body.data.token,
                        user: requestResponse.response.body.data.user,
                    });
                }
            },
            onError(requestResponse: HttpRequestResponse): void {
                if(!command.payload.onError) {
                    return;
                }
                const response = requestResponse.response;
                if(!response) {
                    command.payload.onError();
                    return;
                }
                if(command.payload.onError) {
                    command.payload.onError({
                        generalMessages: response.body.generalMessages,
                        fieldMessages: response.body.fieldMessages,
                    });
                }
            }
        });
    }
}