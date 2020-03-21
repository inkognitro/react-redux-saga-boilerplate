import {ApiHttpRequestHandler, createPostRequest, HttpRequestResponse, SuccessHttpRequestResponse} from "Common/ApiV1/Domain/ApiHttpRequestHandler";
import {User} from "Common/UserManagement/Domain/UserRepository/Types";
import {RefreshToken} from "Common/ApiV1/Domain/Command/Auth/RefreshToken";

type AdditionalSuccessResponseBody = {
    data: {
        token: string,
        user: User
    }
};

export class RefreshTokenHandler {
    private readonly requestHandler: ApiHttpRequestHandler;

    constructor(requestHandler: ApiHttpRequestHandler) {
        this.requestHandler = requestHandler;
    }

    handle(command: RefreshToken): void
    {
        const request = createPostRequest({
            url: '/auth/refreshtoken',
            body: {
                token: command.payload.token,
            },
            isLoaderEnabled: command.payload.isLoaderEnabled
        });
        this.requestHandler.executeRequest({
            request: request,
            onSuccess(requestResponse: SuccessHttpRequestResponse<AdditionalSuccessResponseBody>): void {
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