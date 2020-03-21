import {
    AuthBackendService,
    ReceiveAuthDataSettings,
    ReceiveRefreshedAuthDataSettings
} from "Common/Auth/Domain/AuthBackendService";
import {
    ENDPOINT_URLS,
    ApiHttpRequestManager,
    createGetRequest,
    createPostRequest,
    RequestResponse
} from "Common/ApiV1/Domain/ApiHttpRequestHandler";
import {getResponseBodyJson} from "Common/RequestHandling/Domain/Query";

export class ApiAuthBackendService implements AuthBackendService {
    private readonly apiHttpRequestManager: ApiHttpRequestManager;

    constructor(apiHttpRequestManager: ApiHttpRequestManager) {
        this.apiHttpRequestManager = apiHttpRequestManager;
    }

    receiveAuthData(settings: ReceiveAuthDataSettings): void {
        this.apiHttpRequestManager.executeRequest({
            request: createPostRequest({
                url: ENDPOINT_URLS.AUTH_AUTHENTICATE,
                body: {
                    username: settings.username,
                    password: settings.password,
                },
                isLoaderEnabled: settings.isLoaderEnabled,
            }),
            onSuccess: (summary: RequestResponse): void => {
                if(!settings.onSuccess) {
                    return;
                }
                // @ts-ignore
                const data = getResponseBodyJson(summary).data;
                settings.onSuccess({
                    token: data.token,
                    user: data.user,
                });
            },
            onError: (): void => {
                if(!settings.onError) {
                    return;
                }
                settings.onError();
            }
        });
    }

    receiveRefreshedAuthData(settings: ReceiveRefreshedAuthDataSettings): void {
        this.apiHttpRequestManager.executeRequest({
            apiToken: settings.apiToken,
            request: createGetRequest({
                url: ENDPOINT_URLS.AUTH_REFRESH,
                isLoaderEnabled: settings.isLoaderEnabled,
            }),
            onSuccess: (summary: RequestResponse): void => {
                if(!settings.onSuccess) {
                    return;
                }
                // @ts-ignore
                const data = getResponseBodyJson(summary).data;
                settings.onSuccess({
                    token: data.token,
                    user: data.user,
                });
            },
            onError: (): void => {
                if(!settings.onError) {
                    return;
                }
                settings.onError();
            }
        });
    }
}