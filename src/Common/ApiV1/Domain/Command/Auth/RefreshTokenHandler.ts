import {
    ApiHttpRequestHandler,
    apiV1BaseUrl,
    createPostRequest,
    HttpRequestResponse,
    SuccessHttpRequestResponse
} from "Common/ApiV1/Domain/ApiHttpRequestHandler";
import {User} from "Common/UserManagement/Domain/UserRepository/Types";
import {RefreshToken} from "Common/ApiV1/Domain/Command/Auth/RefreshToken";
import {ReadResponseBody} from "Common/ApiV1/Domain/Types";

type SuccessResponseBody = ReadResponseBody<{
    token: string,
    user: User
}>;

export class RefreshTokenHandler {
    private readonly requestHandler: ApiHttpRequestHandler;

    constructor(requestHandler: ApiHttpRequestHandler) {
        this.requestHandler = requestHandler;
    }

    handle(command: RefreshToken): void
    {
        const request = createPostRequest({
            url: apiV1BaseUrl + '/auth/refreshtoken',
            isLoaderEnabled: command.payload.isLoaderEnabled,
            body: {
                token: command.payload.token
            }
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